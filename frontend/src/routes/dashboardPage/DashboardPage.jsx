import "./dashboardPage.css";
import { assets } from "../../assets/assets";
import { useAuth } from "@clerk/clerk-react";

const DashboardPage = () => {
  const userId = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    await fetch("http://localhost:3000/api/chats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src={assets.logo} alt="" />
          <h1>SUG AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src={assets.chat} alt="" />
            <span> Create New Chat</span>
          </div>
          <div className="option">
            <img src={assets.image} alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src={assets.code} alt="" />
            <span>Help with Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Ask me anything..." />
          <button>
            <img src={assets.arrow} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
