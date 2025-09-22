// src/pages/Auth/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("✅ " + response.data.message);
        setEmail("");
        setPassword("");
        setTimeout(() => navigate("/login-player"), 1000);
      }
    } catch (err) {
      if (err.response) {
        setError("❌ " + (err.response.data.message || "Registration failed."));
      } else {
        setError("❌ Server not reachable.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Register</button>
      </form>

      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

// Simple inline styles
const styles = {
  container: { maxWidth: "400px", margin: "50px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  input: { padding: "8px", fontSize: "14px" },
  button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" },
  success: { color: "green", marginTop: "10px" },
  error: { color: "red", marginTop: "10px" },
};

export default Register;
