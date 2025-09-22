import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

function AdminQuestionsViewer() {
  const [tournament, setTournament] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { tournamentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournamentAndQuestions = async () => {
      try {
        setLoading(true);
        
        // Mock data for demonstration
        const mockTournament = {
          id: tournamentId,
          name: "Spring Boot Quiz",
          category: "Programming", 
          difficulty: "easy",
          creator: "Admin User"
        };

        const mockQuestions = [
          {
            id: 1,
            question: "What is the main advantage of Spring Boot over traditional Spring?",
            correct_answer: "Auto-configuration and embedded server",
            incorrect_answers: [
              "Better performance",
              "More security features", 
              "Smaller file size"
            ],
            type: "multiple_choice",
            difficulty: "easy"
          },
          {
            id: 2,
            question: "Which annotation is used to mark a class as a Spring Boot main class?",
            correct_answer: "@SpringBootApplication",
            incorrect_answers: [
              "@EnableAutoConfiguration",
              "@SpringBootMain",
              "@Application"
            ],
            type: "multiple_choice", 
            difficulty: "easy"
          },
          {
            id: 3,
            question: "What is the default port for a Spring Boot web application?",
            correct_answer: "8080",
            incorrect_answers: [
              "8000",
              "3000",
              "9090"
            ],
            type: "multiple_choice",
            difficulty: "easy"
          },
          {
            id: 4,
            question: "Which file is used to configure Spring Boot application properties?",
            correct_answer: "application.properties",
            incorrect_answers: [
              "config.properties",
              "spring.properties",
              "boot.properties"
            ],
            type: "multiple_choice",
            difficulty: "easy"
          },
          {
            id: 5,
            question: "What does IoC stand for in Spring framework?",
            correct_answer: "Inversion of Control",
            incorrect_answers: [
              "Internet of Code",
              "Input Output Control",
              "Integration of Components"
            ],
            type: "multiple_choice",
            difficulty: "medium"
          }
        ];

        setTournament(mockTournament);
        setQuestions(mockQuestions);
        setError(null);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load tournament questions.');
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournamentAndQuestions();
    }
  }, [tournamentId]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading Questions...</h3>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #f3f3f3',
          borderTop: '3px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '20px auto'
        }} />
        <style>
          {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h3>Error</h3>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/tournaments')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Back to Tournaments
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Demo Notice */}
      <div style={{
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#856404'
      }}>
        <strong>Demo Mode:</strong> Showing sample questions for demonstration.
      </div>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '1px solid #dee2e6'
      }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0', color: '#495057' }}>
            Tournament Questions
          </h1>
          <p style={{ margin: '0', color: '#6c757d', fontSize: '16px' }}>
            {tournament?.name} - {questions.length} Questions
          </p>
        </div>
        <button
          onClick={() => navigate('/tournaments')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Back to Tournaments
        </button>
      </div>

      {/* Tournament Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>
            {questions.length}
          </div>
          <div style={{ color: '#6c757d', fontSize: '14px' }}>Total Questions</div>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>
            {tournament?.difficulty}
          </div>
          <div style={{ color: '#6c757d', fontSize: '14px' }}>Difficulty</div>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#6f42c1' }}>
            {tournament?.category}
          </div>
          <div style={{ color: '#6c757d', fontSize: '14px' }}>Category</div>
        </div>
      </div>

      {/* Questions List */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ color: '#495057', marginBottom: '20px' }}>Questions & Answers</h3>
        
        {questions.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #dee2e6'
          }}>
            <p style={{ color: '#6c757d', fontSize: '18px' }}>No questions found for this tournament.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {questions.map((question, index) => (
              <div
                key={question.id}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: '10px',
                  padding: '25px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {/* Question Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid #e9ecef'
                }}>
                  <h4 style={{
                    margin: 0,
                    color: '#495057',
                    fontSize: '16px'
                  }}>
                    Question {index + 1}
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <span style={{
                      padding: '3px 8px',
                      backgroundColor: '#e7f3ff',
                      color: '#0066cc',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {question.type || 'Multiple Choice'}
                    </span>
                    <span style={{
                      padding: '3px 8px',
                      backgroundColor: question.difficulty === 'easy' ? '#d4edda' : 
                                      question.difficulty === 'medium' ? '#fff3cd' : '#f8d7da',
                      color: question.difficulty === 'easy' ? '#155724' :
                             question.difficulty === 'medium' ? '#856404' : '#721c24',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {question.difficulty}
                    </span>
                  </div>
                </div>

                {/* Question Text */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#495057',
                    margin: '0'
                  }}>
                    {question.question}
                  </p>
                </div>

                {/* Answers */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h5 style={{ 
                    margin: '0 0 10px 0', 
                    color: '#495057',
                    fontSize: '14px'
                  }}>
                    Answers:
                  </h5>
                  
                  {/* Correct Answer */}
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      marginRight: '10px'
                    }}>
                      CORRECT
                    </span>
                    <span style={{ color: '#155724', fontWeight: '500' }}>
                      {question.correct_answer}
                    </span>
                  </div>

                  {/* Incorrect Answers */}
                  {question.incorrect_answers.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      style={{
                        padding: '12px',
                        backgroundColor: '#f8d7da',
                        border: '1px solid #f5c6cb',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginRight: '10px'
                      }}>
                        INCORRECT
                      </span>
                      <span style={{ color: '#721c24' }}>
                        {answer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{
        textAlign: 'center',
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px'
      }}>
        <button
          onClick={() => navigate('/tournaments')}
          style={{
            padding: '12px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Back to Tournament Management
        </button>
      </div>
    </div>
  );
}

export default AdminQuestionsViewer;