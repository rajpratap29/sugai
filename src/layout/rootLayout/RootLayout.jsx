import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";
import { assets } from "../../assets/assets";

const RootLayout = () => {
  return <div className="rootLayout">
    <header>
        <Link to="/" className="logo">
        <img src={assets.logo} alt="" />
        <span>SUG AI</span>
        </Link>
        <div className="user">
          User
        </div>
    </header>
    <main>
        <Outlet/>
    </main>
  </div>;
};

export default RootLayout;
