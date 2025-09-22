import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

function PlayerProgress() {
  const [completedTournaments, setCompletedTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        
        // Mock completed tournaments data for demo
        const mockCompletedTournaments = [
          {
            id: 7,
            name: "Spring Boot Quiz",
            category: "Programming",
            difficulty: "easy",
            completedAt: "2025-09-22T10:30:00Z",
            score: 85,
            correctAnswers: 4,
            totalQuestions: 5,
            passed: true,
            attemptId: 56
          },
          {
            id: 8,
            name: "JavaScript Fundamentals", 
            category: "Programming",
            difficulty: "medium",
            completedAt: "2025-09-21T14:15:00Z",
            score: 60,
            correctAnswers: 3,
            totalQuestions: 5,
            passed: true,
            attemptId: 52
          },
          {
            id: 9,
            name: "React Basics",
            category: "Frontend",
            difficulty: "easy",
            completedAt: "2025-09-20T16:45:00Z",
            score: 40,
            correctAnswers: 2,
            totalQuestions: 5,
            passed: false,
            attemptId: 48
          }
        ];
        
        setCompletedTournaments(mockCompletedTournaments);
        setError(null);
        
      } catch (err) {
        console.error('Error fetching progress:', err);
        setError('Failed to load tournament progress.');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const getScoreColor = (score, passed) => {
    if (passed && score >= 80) return '#28a745'; // Excellent - Green
    if (passed && score >= 70) return '#17a2b8'; // Good - Blue  
    if (passed) return '#ffc107'; // Pass - Yellow
    return '#dc3545'; // Fail - Red
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  const getScoreLabel = (score, passed) => {
    if (!passed) return 'Failed';
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    return 'Passed';
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading Progress...</h3>
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
      <div style={{ padding: '20px', textAlign: 'center', color: '#dc3545' }}>
        <h3>Error Loading Progress</h3>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
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
        <strong>Demo Mode:</strong> Showing sample tournament completion data.
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
            My Tournament Progress
          </h1>
          <p style={{ margin: 0, color: '#6c757d' }}>
            Track your completed tournaments and scores
          </p>
        </div>
        <button
          onClick={() => navigate('/player/tournaments')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Find More Tournaments
        </button>
      </div>

      {/* Progress Statistics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff' }}>
            {completedTournaments.length}
          </div>
          <div style={{ color: '#6c757d', marginTop: '5px' }}>
            Tournaments Completed
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745' }}>
            {completedTournaments.filter(t => t.passed).length}
          </div>
          <div style={{ color: '#6c757d', marginTop: '5px' }}>
            Tournaments Passed
          </div>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#6f42c1' }}>
            {Math.round(completedTournaments.reduce((sum, t) => sum + t.score, 0) / completedTournaments.length) || 0}%
          </div>
          <div style={{ color: '#6c757d', marginTop: '5px' }}>
            Average Score
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ffc107' }}>
            {completedTournaments.filter(t => t.score >= 80).length}
          </div>
          <div style={{ color: '#6c757d', marginTop: '5px' }}>
            Excellent Scores (80%+)
          </div>
        </div>
      </div>

      {/* Completed Tournaments List */}
      <div>
        <h3 style={{ color: '#495057', marginBottom: '20px' }}>Tournament History</h3>
        
        {completedTournaments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            backgroundColor: 'white',
            borderRadius: '10px',
            border: '1px solid #dee2e6'
          }}>
            <h4 style={{ color: '#6c757d', marginBottom: '10px' }}>No Completed Tournaments</h4>
            <p style={{ color: '#6c757d', margin: 0 }}>
              Start taking tournaments to see your progress here!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {completedTournaments.map((tournament) => (
              <div
                key={tournament.attemptId}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #dee2e6',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      margin: '0 0 8px 0',
                      color: '#495057',
                      fontSize: '18px'
                    }}>
                      {tournament.name}
                    </h4>
                    <div style={{
                      display: 'flex',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <span style={{
                        backgroundColor: '#e7f3ff',
                        color: '#0066cc',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {tournament.category}
                      </span>
                      <span style={{
                        backgroundColor: '#f8f9fa',
                        color: '#495057',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {getDifficultyIcon(tournament.difficulty)} {tournament.difficulty}
                      </span>
                    </div>
                    <div style={{ color: '#6c757d', fontSize: '14px' }}>
                      Completed: {new Date(tournament.completedAt).toLocaleString()}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '120px' }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: getScoreColor(tournament.score, tournament.passed)
                    }}>
                      {tournament.score}%
                    </div>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: getScoreColor(tournament.score, tournament.passed),
                      marginBottom: '5px'
                    }}>
                      {getScoreLabel(tournament.score, tournament.passed)}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6c757d' }}>
                      {tournament.correctAnswers}/{tournament.totalQuestions} correct
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{
                  width: '100%',
                  backgroundColor: '#e9ecef',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${tournament.score}%`,
                    backgroundColor: getScoreColor(tournament.score, tournament.passed),
                    height: '100%',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                {/* Performance Badge */}
                <div style={{
                  marginTop: '10px',
                  textAlign: 'right'
                }}>
                  {tournament.passed ? (
                    <span style={{
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓ PASSED
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✗ FAILED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Motivational Footer */}
      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#e7f3ff',
        borderRadius: '10px',
        border: '1px solid #b3d9ff',
        textAlign: 'center'
      }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#0066cc' }}>
          Keep Learning!
        </h4>
        <p style={{ margin: 0, color: '#0066cc' }}>
          Challenge yourself with more tournaments to improve your knowledge and skills.
        </p>
      </div>
    </div>
  );
}

export default PlayerProgress;