import "./newPrompt.css";
import { assets } from "../../assets/assets";
import { useEffect, useRef } from "react";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Add new chat */}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        <label htmlFor="file">
          <img src={assets.attachment} alt="" />
        </label>
        <input id="file" type="file" multiple={false} hidden />
        <input type="text" placeholder="Ask Anything..." />
        <button>
          <img src={assets.arrow} alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
