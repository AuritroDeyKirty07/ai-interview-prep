import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/app-header.scss";

const AppHeader = ({ active = "dashboard" }) => {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();
    const [loggingOut, setLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState("");

    const onLogout = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to logout?"
        );


        if (!confirmed) return;

        setLogoutError("");
        setLoggingOut(true);

        try {
            const success = await handleLogout();

            if (success) {
                navigate("/login", { replace: true });
            } else {
                setLogoutError("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            setLogoutError("Something went wrong. Please try again.");
        } finally {
            setLoggingOut(false);
        }
    };

    return (
        <header className="app-header">
            <Link className="app-brand" to="/" aria-label="AI Interview Prep dashboard">
                <span className="app-brand__mark">AI</span>
                <span>Interview Prep</span>
            </Link>

            <nav className="app-header__nav" aria-label="Main navigation">
                <Link className={active === "dashboard" ? "is-active" : ""} to="/">Dashboard</Link>
                <Link className={active === "new" ? "is-active" : ""} to="/new-interview">New Interview</Link>
            </nav>

            <div className="app-header__user">
                <span className="app-header__greeting">Hi, {user?.username || "there"}</span>
                <button type="button" onClick={onLogout} disabled={loggingOut} className="app-header__logout">
                    {loggingOut ? "Logging out…" : "Logout"}
                </button>
            </div>
            {logoutError && <span className="app-header__error" role="alert">{logoutError}</span>}
        </header>
    );
};

export default AppHeader;
