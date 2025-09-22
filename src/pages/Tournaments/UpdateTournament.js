import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../api/axios';

function UpdateTournament() {
  const [formData, setFormData] = useState({
    name: '',
    creator: '',
    category: '',
    difficulty: 'easy',
    startDate: '',
    endDate: '',
    minPassingScore: 60
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const [searchParams] = useSearchParams();
  const tournamentId = searchParams.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        
        // For demo, use mock data based on tournamentId
        const mockTournament = {
          id: tournamentId,
          name: "Spring Boot Quiz",
          creator: "Admin User",
          category: "Programming",
          difficulty: "easy",
          startDate: "2025-09-20",
          endDate: "2025-09-25",
          minPassingScore: 60
        };
        
        setFormData(mockTournament);
        setErrors({});
        
      } catch (err) {
        console.error('Error fetching tournament:', err);
        setErrors({ general: 'Failed to load tournament data. Please try again.' });
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      fetchTournament();
    } else {
      setErrors({ general: 'No tournament ID provided.' });
      setLoading(false);
    }
  }, [tournamentId]);

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Tournament name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Tournament name must be at least 3 characters';
    }

    if (!formData.creator.trim()) {
      newErrors.creator = 'Creator name is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && formData.endDate <= formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!formData.minPassingScore || formData.minPassingScore < 0 || formData.minPassingScore > 100) {
      newErrors.minPassingScore = 'Passing score must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    
    try {
      // Simulate API call
      console.log('Updating tournament:', formData);
      
      // Mock successful update
      setTimeout(() => {
        setSuccess(true);
        setSaving(false);
        
        setTimeout(() => {
          navigate('/tournaments');
        }, 2000);
      }, 1000);
      
    } catch (err) {
      console.error('Error updating tournament:', err);
      setErrors({ general: 'Failed to update tournament. Please try again.' });
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading Tournament...</h3>
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

  if (success) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #c3e6cb',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <h3>Tournament Updated Successfully!</h3>
          <p>Redirecting to tournament list...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
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
        <strong>Demo Mode:</strong> Using sample data for tournament editing.
      </div>

      {/* Header */}
      <div style={{
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        border: '1px solid #dee2e6'
      }}>
        <h1 style={{ margin: '0 0 5px 0', color: '#495057' }}>
          Update Tournament
        </h1>
        <p style={{ margin: 0, color: '#6c757d' }}>
          Edit tournament details and settings
        </p>
      </div>

      {/* General Error */}
      {errors.general && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {errors.general}
        </div>
      )}

      {/* Update Form */}
      <form onSubmit={handleSubmit}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {/* Tournament Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Tournament Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.name ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter tournament name"
            />
            {errors.name && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.name}
              </div>
            )}
          </div>

          {/* Creator */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Creator *
            </label>
            <input
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.creator ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter creator name"
            />
            {errors.creator && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.creator}
              </div>
            )}
          </div>

          {/* Category */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.category ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select category</option>
              <option value="Programming">Programming</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="Literature">Literature</option>
              <option value="General Knowledge">General Knowledge</option>
            </select>
            {errors.category && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.category}
              </div>
            )}
          </div>

          {/* Difficulty */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Difficulty *
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '10px',
                border: errors.difficulty ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.difficulty}
              </div>
            )}
          </div>

          {/* Date Fields */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#495057'
              }}>
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.startDate ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.startDate && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.startDate}
                </div>
              )}
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: 'bold',
                color: '#495057'
              }}>
                End Date *
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: errors.endDate ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.endDate && (
                <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                  {errors.endDate}
                </div>
              )}
            </div>
          </div>

          {/* Passing Score */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              fontWeight: 'bold',
              color: '#495057'
            }}>
              Minimum Passing Score (%) *
            </label>
            <input
              type="number"
              name="minPassingScore"
              value={formData.minPassingScore}
              onChange={handleInputChange}
              min="0"
              max="100"
              style={{
                width: '100%',
                padding: '10px',
                border: errors.minPassingScore ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter passing score (0-100)"
            />
            {errors.minPassingScore && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px' }}>
                {errors.minPassingScore}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end' 
          }}>
            <button
              type="button"
              onClick={() => navigate('/tournaments')}
              style={{
                padding: '12px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '12px 20px',
                backgroundColor: saving ? '#6c757d' : '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {saving ? 'Updating...' : 'Update Tournament'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateTournament;