import "./dashboardPage.css";
import { assets } from "../../assets/assets";

const DashboardPage = () => {
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
        <form>
          <input type="text" placeholder="Ask me anything..." />
          <button>
            <img src={assets.arrow} alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
