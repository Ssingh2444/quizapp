// src/pages/Player/TournamentSelection.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function TournamentSelection() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startingTournament, setStartingTournament] = useState(null);

  const navigate = useNavigate();
  const playerId = localStorage.getItem("playerId"); // assuming playerId is stored on login

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/tournaments-management");
        setTournaments(response.data || []);
      } catch (err) {
        console.error("Error fetching tournaments:", err);
        setError("Failed to load tournaments.");
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const handleStartTournament = async (tournament) => {
    if (startingTournament) return;
    setStartingTournament(tournament.id);

    try {
      const response = await axios.post("/api/player/attempts/start", {
        userId: playerId,
        tournamentId: tournament.id,
        category: tournament.category,
        difficulty: tournament.difficulty,
      });

      const attemptId = response.data.attemptId;

      // ✅ Store category + difficulty in lowercase so TournamentQuestions reads them safely
      localStorage.setItem("quizCategory", tournament.category.toLowerCase());
      localStorage.setItem("quizDifficulty", tournament.difficulty.toLowerCase());

      navigate(`/player/questions?attemptId=${attemptId}&tournamentId=${tournament.id}`);
    } catch (err) {
      console.error("Error starting tournament:", err);
      alert("Failed to start tournament. Please try again.");
    } finally {
      setStartingTournament(null);
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading tournaments...</h3>;
  if (error) return <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Available Tournaments</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
        {tournaments.map((t) => (
          <div key={t.id} style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
            <h3>{t.name}</h3>
            <p>📚 {t.category}</p>
            <p>🎯 Difficulty: {t.difficulty}</p>
            <p>✅ Passing Score: {t.minPassingScore || 0}%</p>
            <button
              onClick={() => handleStartTournament(t)}
              disabled={startingTournament === t.id}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: startingTournament === t.id ? "#6c757d" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {startingTournament === t.id ? "Starting..." : "🚀 Start Quiz"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TournamentSelection;
