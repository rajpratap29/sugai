import "./newPrompt.css";
import { assets } from "../../assets/assets";
import { useEffect, useRef, useState, useCallback } from "react";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const [chat, setChat] = useState(null);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const endRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    console.log("Data History:", data?.history);
    endRef.current.scrollIntoView({ behavior: "smooth" });
    const runEffect = async () => {
      if (!hasRun.current && data?.history?.length > 0) {
        await initializeChat();
        if (chat) {
          add(data.history[0].parts[0].text, true);
        }
      }
      hasRun.current = true;
    };
    runEffect();
  }, [data]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
        });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const initializeChat = async () => {
    try {
      const history =
        data?.history?.map(({ role, parts }) => ({
          role,
          parts: [{ text: parts[0].text }],
        })) || [];

      if (history.length === 0) {
        history.push({ role: "user", parts: [{ text: "Hi" }] });
      } else if (history[0].role !== "user") {
        history.unshift({ role: "user", parts: [{ text: "Hi" }] });
      }

      const newChat = model.startChat({
        history: history,
        generationConfig: {
          // maxOutputTokens: 1000,
        },
      });

      console.log("New Chat:", newChat); // Added console log
      setChat(newChat);
      console.log("Chat initialized:", chat);
      forceUpdate(); // Force re-render
    } catch (error) {
      console.error("Error initializing chat:", error);
    }
  };

  const add = async (text, isInitial) => {
    if (!chat) {
      await initializeChat();
    }

    if (isInitial) {
      if (!chat) {
        console.error("Chat session not initialized.");
        return;
      }
      try {
        console.log("Sending message:", text);
        const result = await chat.sendMessage(text);
        console.log("Response:", result);
        setAnswer(result.response.text());
        mutation.mutate();
      } catch (err) {
        console.error("Error sending message:", err);
      }
      return;
    }

    if (!isInitial) setQuestion(text);

    try {
      console.log("Sending message stream:", text);
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      console.log("Response:", result);
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        console.log("Accumulated Text", accumulatedText);
        setAnswer(accumulatedText);
      }

      mutation.mutate();
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };

  const hasRun = useRef(false);

  return (
    <>
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width={380}
          transformation={[{ width: 380 }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" name="text" placeholder="Ask Anything..." />
        <button>
          <img src={assets.arrow} alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
