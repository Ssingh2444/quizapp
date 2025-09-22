import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // "ADMIN" or "PLAYER"
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#343a40",
        color: "white",
      }}
    >
      {/* Left side: Brand */}
      <div>
        <Link
          to="/"
          style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
        >
          Quiz App
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div style={{ display: "flex", gap: "20px" }}>
        {role === "ADMIN" && (
          <>
            <Link to="/tournaments" style={linkStyle}>
              Tournaments
            </Link>
            <Link to="/users" style={linkStyle}>
              Users
            </Link>
          </>
        )}

        {role === "PLAYER" && (
          <>
            <Link to="/player/tournaments" style={linkStyle}>
              Tournaments
            </Link>
            <Link to="/player/progress" style={linkStyle}>
              Progress
            </Link>
          </>
        )}

        {isLoggedIn && (
          <Link to="/profile" style={linkStyle}>
            Profile
          </Link>
        )}
      </div>

      {/* Right side: Auth */}
      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login-player" style={linkStyle}>
              Player Login
            </Link>
            <Link to="/login-admin" style={linkStyle}>
              Admin Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              border: "none",
              padding: "8px 15px",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
};

export default Navbar;
