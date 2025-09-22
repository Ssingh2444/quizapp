import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

function TournamentList() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/tournaments-management');
      setTournaments(response.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching tournaments:', err);
      // Use mock data for demo
      const mockTournaments = [
        {
          id: 7,
          name: "Spring Boot Quiz",
          category: "Programming",
          difficulty: "easy",
          creator: "Admin User",
          startDate: "2025-09-20",
          endDate: "2025-09-25",
          minPassingScore: 60
        },
        {
          id: 8,
          name: "JavaScript Fundamentals",
          category: "Programming", 
          difficulty: "medium",
          creator: "Admin User",
          startDate: "2025-09-21",
          endDate: "2025-09-28",
          minPassingScore: 70
        },
        {
          id: 9,
          name: "React Basics",
          category: "Frontend",
          difficulty: "easy",
          creator: "Admin User",
          startDate: "2025-09-22",
          endDate: "2025-09-30",
          minPassingScore: 65
        }
      ];
      setTournaments(mockTournaments);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tournamentId) => {
    if (deleteConfirm !== tournamentId) {
      setDeleteConfirm(tournamentId);
      setTimeout(() => setDeleteConfirm(null), 3000); // Clear after 3 seconds
      return;
    }

    try {
      await axios.delete(`/api/admin/tournaments/${tournamentId}`);
      setTournaments(tournaments.filter(t => t.id !== tournamentId));
      setDeleteConfirm(null);
      alert('Tournament deleted successfully!');
    } catch (err) {
      console.error('Error deleting tournament:', err);
      alert('Error deleting tournament. Please try again.');
      setDeleteConfirm(null);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return '#28a745';
      case 'medium': return '#ffc107';
      case 'hard': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading Tournaments...</h3>
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

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Demo Notice */}
      {tournaments.length > 0 && tournaments[0].name === "Spring Boot Quiz" && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#856404'
        }}>
          <strong>Demo Mode:</strong> Using sample tournament data for demonstration.
        </div>
      )}

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
            Tournament Management
          </h1>
          <p style={{ margin: 0, color: '#6c757d' }}>
            Manage quiz tournaments and view questions
          </p>
        </div>
        <button
          onClick={() => navigate('/tournaments/create')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          + Create Tournament
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* Tournaments Table */}
      {tournaments.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '1px solid #dee2e6'
        }}>
          <h3 style={{ color: '#6c757d' }}>No Tournaments Found</h3>
          <p style={{ color: '#6c757d' }}>Create your first tournament to get started.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #dee2e6',
                  color: '#495057',
                  fontWeight: 'bold'
                }}>
                  Tournament Name
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #dee2e6',
                  color: '#495057',
                  fontWeight: 'bold'
                }}>
                  Creator
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'left',
                  borderBottom: '1px solid #dee2e6',
                  color: '#495057',
                  fontWeight: 'bold'
                }}>
                  Category
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  borderBottom: '1px solid #dee2e6',
                  color: '#495057',
                  fontWeight: 'bold'
                }}>
                  Difficulty
                </th>
                <th style={{
                  padding: '15px',
                  textAlign: 'center',
                  borderBottom: '1px solid #dee2e6',
                  color: '#495057',
                  fontWeight: 'bold'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament, index) => (
                <tr
                  key={tournament.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #dee2e6'
                  }}
                >
                  {/* Clickable Tournament Name */}
                  <td style={{ padding: '15px' }}>
                    <button 
                      onClick={() => navigate(`/tournaments/${tournament.id}/questions`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#007bff',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        fontSize: '16px',
                        fontWeight: '500',
                        padding: 0,
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#0056b3'}
                      onMouseLeave={(e) => e.target.style.color = '#007bff'}
                    >
                      {tournament.name}
                    </button>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#6c757d', 
                      marginTop: '2px' 
                    }}>
                      Click to view questions
                    </div>
                  </td>
                  
                  <td style={{ padding: '15px', color: '#495057' }}>
                    {tournament.creator || 'N/A'}
                  </td>
                  
                  <td style={{ padding: '15px' }}>
                    <span style={{
                      backgroundColor: '#e7f3ff',
                      color: '#0066cc',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {tournament.category}
                    </span>
                  </td>
                  
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{
                      backgroundColor: getDifficultyColor(tournament.difficulty),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {tournament.difficulty}
                    </span>
                  </td>
                  
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                      <button
                        onClick={() => navigate(`/tournaments/update?id=${tournament.id}`)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#6f42c1',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tournament.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: deleteConfirm === tournament.id ? '#dc3545' : '#6c757d',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        {deleteConfirm === tournament.id ? 'Confirm?' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e7f3ff',
        borderRadius: '8px',
        border: '1px solid #b3d9ff'
      }}>
        <p style={{ margin: 0, color: '#0066cc', fontSize: '14px' }}>
          <strong>Instructions:</strong> Click on any tournament name to view its questions and answers. 
          Use Edit to modify tournament details, or Delete to remove a tournament (click twice to confirm).
        </p>
      </div>
    </div>
  );
}

export default TournamentList;