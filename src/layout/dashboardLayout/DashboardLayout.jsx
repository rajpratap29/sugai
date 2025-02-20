import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";

const dashboardLayout = () => {
  return (
    <div className="dashboardLayout">
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default dashboardLayout;
