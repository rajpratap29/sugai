import { Link } from "react-router-dom";
import "./chatList.css";
import { assets } from "../../assets/assets";
import { useQuery } from "@tanstack/react-query";

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">New Chat</Link>
      <Link to="/">Explore SUG AI</Link>
      <Link to="https://www.linkedin.com/in/rajpratap29/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src={assets.logo} alt="" />
        <div className="texts">
          <Link to="https://github.com/rajpratap29/" className="linkUpgrade">
            <div className="span1">Check out my Repo!</div>
            <div className="span2">Explore the source code of SUG AI</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
