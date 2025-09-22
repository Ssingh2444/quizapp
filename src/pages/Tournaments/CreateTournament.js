import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

function CreateTournament() {
  const [formData, setFormData] = useState({
    name: '',
    creator: '',
    category: '',
    difficulty: 'easy',
    startDate: '',
    endDate: '',
    minPassingScore: 60
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Tournament name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Tournament name must be at least 3 characters';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Tournament name must not exceed 50 characters';
    }

    if (!formData.creator.trim()) {
      newErrors.creator = 'Creator name is required';
    } else if (formData.creator.length < 2) {
      newErrors.creator = 'Creator name must be at least 2 characters';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.difficulty) {
      newErrors.difficulty = 'Difficulty level is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else {
      const startDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (startDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
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
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.focus();
      }
      return;
    }

    setSaving(true);
    
    try {
      // Mock API call for demo
      console.log('Creating tournament:', formData);
      
      // Simulate API call delay
      setTimeout(() => {
        setSuccess(true);
        setSaving(false);
        
        // Redirect after success message
        setTimeout(() => {
          navigate('/tournaments');
        }, 2000);
      }, 1500);
      
    } catch (err) {
      console.error('Error creating tournament:', err);
      setErrors({ general: 'Failed to create tournament. Please try again.' });
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      creator: '',
      category: '',
      difficulty: 'easy',
      startDate: '',
      endDate: '',
      minPassingScore: 60
    });
    setErrors({});
  };

  if (success) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '30px',
          borderRadius: '10px',
          border: '1px solid #c3e6cb',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <h2>Tournament Created Successfully!</h2>
          <p>Your new tournament has been added to the system.</p>
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
        <strong>Demo Mode:</strong> Form validation is working, actual creation is simulated.
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
          Create New Tournament
        </h1>
        <p style={{ margin: 0, color: '#6c757d' }}>
          Fill in the details to create a new quiz tournament
        </p>
      </div>

      {/* General Error */}
      {errors.general && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
          textAlign: 'center',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {errors.general}
        </div>
      )}

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && !errors.general && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Please fix the following errors:</strong>
          <ul style={{ marginTop: '10px', marginBottom: 0 }}>
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Create Form */}
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
                padding: '12px',
                border: errors.name ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box',
                backgroundColor: errors.name ? '#fff5f5' : 'white'
              }}
              placeholder="Enter tournament name (3-50 characters)"
              maxLength={50}
            />
            {errors.name && (
              <div style={{ 
                color: '#dc3545', 
                fontSize: '14px', 
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '5px' }}>⚠️</span>
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
              Creator Name *
            </label>
            <input
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: errors.creator ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box',
                backgroundColor: errors.creator ? '#fff5f5' : 'white'
              }}
              placeholder="Enter creator name"
            />
            {errors.creator && (
              <div style={{ 
                color: '#dc3545', 
                fontSize: '14px', 
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '5px' }}>⚠️</span>
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
                padding: '12px',
                border: errors.category ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box',
                backgroundColor: errors.category ? '#fff5f5' : 'white'
              }}
            >
              <option value="">Select a category</option>
              <option value="Programming">Programming</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="History">History</option>
              <option value="Literature">Literature</option>
              <option value="General Knowledge">General Knowledge</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
            </select>
            {errors.category && (
              <div style={{ 
                color: '#dc3545', 
                fontSize: '14px', 
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '5px' }}>⚠️</span>
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
              Difficulty Level *
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '12px',
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
              <div style={{ 
                color: '#dc3545', 
                fontSize: '14px', 
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '5px' }}>⚠️</span>
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
                  padding: '12px',
                  border: errors.startDate ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: errors.startDate ? '#fff5f5' : 'white'
                }}
              />
              {errors.startDate && (
                <div style={{ 
                  color: '#dc3545', 
                  fontSize: '14px', 
                  marginTop: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ marginRight: '5px' }}>⚠️</span>
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
                  padding: '12px',
                  border: errors.endDate ? '2px solid #dc3545' : '1px solid #ced4da',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  backgroundColor: errors.endDate ? '#fff5f5' : 'white'
                }}
              />
              {errors.endDate && (
                <div style={{ 
                  color: '#dc3545', 
                  fontSize: '14px', 
                  marginTop: '5px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ marginRight: '5px' }}>⚠️</span>
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
                padding: '12px',
                border: errors.minPassingScore ? '2px solid #dc3545' : '1px solid #ced4da',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box',
                backgroundColor: errors.minPassingScore ? '#fff5f5' : 'white'
              }}
              placeholder="Enter passing score (0-100)"
            />
            {errors.minPassingScore && (
              <div style={{ 
                color: '#dc3545', 
                fontSize: '14px', 
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{ marginRight: '5px' }}>⚠️</span>
                {errors.minPassingScore}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
              Students need to score at least this percentage to pass the tournament
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end',
            borderTop: '1px solid #e9ecef',
            paddingTop: '20px'
          }}>
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: '12px 20px',
                backgroundColor: '#ffc107',
                color: '#856404',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Reset Form
            </button>
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
                padding: '12px 24px',
                backgroundColor: saving ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {saving ? 'Creating...' : 'Create Tournament'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTournament;