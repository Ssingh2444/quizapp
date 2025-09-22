// src/pages/Player/TournamentQuestions.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function TournamentQuestions() {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const attemptId = query.get("attemptId");
  const tournamentId = query.get("tournamentId");

  // ✅ Read lowercase values from localStorage
  const category = localStorage.getItem("quizCategory");
  const difficulty = localStorage.getItem("quizDifficulty");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        console.log("DEBUG fetching questions with:", {
          tournamentId,
          category,
          difficulty,
        });

        const response = await axios.get(
          `/api/player/tournaments/${tournamentId}/questions`,
          {
            params: { amount: 5, category, difficulty },
          }
        );

        if (response.data && response.data.length > 0) {
          const formatted = response.data.map((q, idx) => ({
            id: idx,
            question: q.question,
            correctAnswer: q.correctAnswer,
            options: [...q.incorrectAnswers, q.correctAnswer].sort(
              () => Math.random() - 0.5
            ),
          }));
          setQuestions(formatted);
          setError(null);
        } else {
          setError("No questions available for this tournament.");
        }
      } catch (err) {
        console.error("Error fetching tournament questions:", err);
        setError("Failed to load quiz questions. Please try another tournament.");
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId && attemptId) {
      fetchQuestions();
    } else {
      setError("Missing tournament or attempt information.");
      setLoading(false);
    }
  }, [tournamentId, attemptId, category, difficulty]);

  const handleAnswerSelect = (qId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: answer }));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!window.confirm("Are you sure you want to submit?")) return;

    setIsSubmitting(true);
    try {
      const payload = {
        answers: questions.map((q) => ({
          id: q.question,
          answer: selectedAnswers[q.id] || "",
        })),
      };

      const response = await axios.post(
        `/api/player/attempts/${attemptId}/submit`,
        payload
      );

      setFinalScore(response.data.score || 0);
      setQuizCompleted(true);
    } catch (err) {
      console.error("Error submitting attempt:", err);
      alert("Failed to submit quiz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading Quiz...</h3>;
  if (error)
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
        <h3>{error}</h3>
        <button onClick={() => navigate("/player/tournaments")}>Back</button>
      </div>
    );

  if (quizCompleted) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "#28a745" }}>Quiz Completed!</h2>
        <p>Your Score: {finalScore}</p>
        <button onClick={() => navigate("/player/tournaments")}>
          Back to Tournaments
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Tournament Quiz</h2>
      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <h4>
            {i + 1}. {q.question}
          </h4>
          {q.options.map((opt, idx) => {
            const isSelected = selectedAnswers[q.id] === opt;
            return (
              <label
                key={idx}
                style={{
                  display: "block",
                  marginBottom: "5px",
                  padding: "8px",
                  borderRadius: "6px",
                  border: `2px solid ${isSelected ? "#007bff" : "#ccc"}`,
                  background: isSelected ? "#e7f3ff" : "white",
                  cursor: "pointer",
                }}
              >
                <input
                  type="radio"
                  name={`q_${q.id}`}
                  value={opt}
                  checked={isSelected}
                  onChange={() => handleAnswerSelect(q.id, opt)}
                  style={{ marginRight: "8px" }}
                />
                {opt}
              </label>
            );
          })}
        </div>
      ))}
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Quiz"}
      </button>
    </div>
  );
}

export default TournamentQuestions;
