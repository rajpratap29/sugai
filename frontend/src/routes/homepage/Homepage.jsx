import { Link } from "react-router-dom";
import "./homepage.css";
import { assets } from "../../assets/assets";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("Human1")

  return (
    <div className="homepage">
      <img src={assets.orbital} alt="" className="orbital" />
      <div className="left">
        <h1>SUG AI</h1>
        <h2>Learn Smarter, Not Harder—Experience SUG AI!</h2>
        <h3>
          Upgrade your skills with AI-driven explanations and insights. Fuel
          your curiosity with intelligent responses in seconds.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src={assets.bot} alt="" className="bot" />
          <div className="chat">
            <img src={typingStatus === "Human1" ? assets.Human1 : typingStatus === "Human2" ? assets.Human2 : assets.bot} alt="" />
            <TypeAnimation
              sequence={[
                "Raj: What is a closure in JavaScript?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "SUG AI: A function with access to its outer scope even after execution.",
                2000,
                () => {
                  setTypingStatus("Human2");
                },
                "Priyavarat: What is JSX in React?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "SUG AI: JSX lets you write HTML inside JavaScript.",
                2000,
                () => {
                  setTypingStatus("Human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src={assets.logo} alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
