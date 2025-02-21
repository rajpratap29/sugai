import { Link } from "react-router-dom"
import "./chatList.css"
import {assets} from "../../assets/assets"

const ChatList = () => {
    return (
        <div className="chatList">
            <span className="title">DASHBOARD</span>
            <Link to="/dashboard">New Chat</Link>
            <Link to="/">Explore SUG AI</Link>
            <Link to="/">Contact</Link>
            <hr/>
            <span className="title">RECENT CHATS</span>
                <div className="list">
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                    <Link to="/">My chat test</Link>
                </div>
            <hr/>
            <div className="upgrade">
                <img src={assets.logo} alt="" />
                <div className="texts">
                    <span>Upgrade to SUG AI Pro</span>
                    <span>Get unlimited access to all features</span>
                </div>
            </div>
        </div>
    )
}

export default ChatList;