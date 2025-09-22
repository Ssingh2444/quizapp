import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StartAttempt() {
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || 1; // ✅ replace with real logged-in user id

  // ✅ Fetch tournaments for players
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/tournaments-management")
      .then((res) => setTournaments(res.data))
      .catch(() => setError("⚠️ Could not load tournaments"));
  }, []);

  // ✅ Start attempt for selected tournament
  const handleStart = async (t) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/player/attempts/start",
        {
          userId: Number(userId),
          tournamentId: t.id,
          category: t.category,
          difficulty: t.difficulty,
        }
      );

      setMessage(res.data.message);
      console.log("Attempt started:", res.data);

      // Redirect to questions page, passing attemptId + tournamentId
      navigate(`/player/questions?attemptId=${res.data.attemptId}&tournamentId=${t.id}`);
    } catch (err) {
      console.error("Start attempt failed:", err);
      setError("❌ Could not start attempt");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", textAlign: "center" }}>
      <h2>Available Tournaments</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tournaments.length === 0 ? (
            <tr>
              <td colSpan="5">No tournaments available</td>
            </tr>
          ) : (
            tournaments.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.category}</td>
                <td>{t.difficulty}</td>
                <td>
                  <button onClick={() => handleStart(t)}>Start Attempt</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StartAttempt;
