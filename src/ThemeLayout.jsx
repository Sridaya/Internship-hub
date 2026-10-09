import { Outlet } from "react-router-dom";
import "./ThemeLayout.css";

function ThemeLayout() {
    const theme = localStorage.getItem("theme") || "dark";

    return (
        <div className={`app-theme ${theme}`}>
            <Outlet />
        </div>
    );
}

export default ThemeLayout;
