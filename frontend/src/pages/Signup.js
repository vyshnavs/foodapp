import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sendData } from '../connections/user';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    mobile: '',
    role: 'donor',
    description: ''
  });
  const [error, setError] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: 'text-muted'
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Check if passwords match when either password field changes
    if (id === 'password' || id === 'confirmPassword') {
      if (id === 'password') {
        setPasswordsMatch(value === formData.confirmPassword || formData.confirmPassword === '');
        checkPasswordStrength(value);
      } else {
        setPasswordsMatch(value === formData.password);
      }
    }
  };

  const checkPasswordStrength = (password) => {
    // Basic password strength criteria
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    // Calculate score (0-4)
    let score = 0;
    if (hasUpperCase) score++;
    if (hasLowerCase) score++;
    if (hasNumbers) score++;
    if (hasSpecialChar) score++;
    if (isLongEnough) score++;
    
    // Define feedback based on score
    let message = '';
    let color = '';
    
    if (password === '') {
      message = '';
      color = 'text-muted';
    } else if (score < 2) {
      message = 'Weak password';
      color = 'text-danger';
    } else if (score < 4) {
      message = 'Moderate password';
      color = 'text-warning';
    } else {
      message = 'Strong password';
      color = 'text-success';
    }
    
    // Suggestions
    if (password !== '' && score < 4) {
      message += '. Suggestion: ';
      if (!hasUpperCase) message += 'Add uppercase letters. ';
      if (!hasLowerCase) message += 'Add lowercase letters. ';
      if (!hasNumbers) message += 'Add numbers. ';
      if (!hasSpecialChar) message += 'Add special characters. ';
      if (!isLongEnough) message += 'Use at least 8 characters. ';
    }
    
    setPasswordStrength({ score, message, color });
  };

  const handleRoleChange = (role) => {
    setFormData({
      ...formData,
      role
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    // Remove confirmPassword before sending data to backend
    const { confirmPassword, ...dataToSend } = formData;
    
    try {
      const response = await sendData(dataToSend);
      setShowSuccessPopup(true);
      console.log("Registration Successful:", response);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="container">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="position-fixed top-0 start-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show mx-auto" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">Success</strong>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setShowSuccessPopup(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              User registered successfully!
            </div>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)} 
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow my-5">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Sign Up</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address <span className="text-danger">*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password <span className="text-danger">*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                  {passwordStrength.message && (
                    <div className={`small mt-1 ${passwordStrength.color}`}>
                      {passwordStrength.message}
                    </div>
                  )}
                </div>
                
                {/* Confirm Password Input */}
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    required
                  />
                  {!passwordsMatch && formData.confirmPassword !== '' && (
                    <div className="small text-danger mt-1">
                      Passwords do not match
                    </div>
                  )}
                </div>
                
                {/* Mobile Input */}
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile Number <span className="text-danger">*</span></label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                
                {/* Address Input */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address <span className="text-danger">*</span></label>
                  <textarea
                    className="form-control"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="2"
                    required
                  ></textarea>
                </div>
                
                {/* Role Selection */}
                <div className="mb-3">
                  <label className="form-label d-block">Select your role <span className="text-danger">*</span></label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="donor"
                      value="donor"
                      checked={formData.role === 'donor'}
                      onChange={() => handleRoleChange('donor')}
                      required
                    />
                    <label className="form-check-label" htmlFor="donor">Donor</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="volunteer"
                      value="volunteer"
                      checked={formData.role === 'volunteer'}
                      onChange={() => handleRoleChange('volunteer')}
                    />
                    <label className="form-check-label" htmlFor="volunteer">Volunteer</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="recipient"
                      value="recipient"
                      checked={formData.role === 'recipient'}
                      onChange={() => handleRoleChange('recipient')}
                    />
                    <label className="form-check-label" htmlFor="recipient">Recipient</label>
                  </div>
                </div>
                
                {/* Description Input (Optional) */}
                <div className="mb-4">
                  <label htmlFor="description" className="form-label">Description <span className="text-muted">(Optional)</span></label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about yourself or your organization"
                    rows="3"
                  ></textarea>
                </div>
                
                {/* Sign Up Button */}
                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!passwordsMatch || formData.password !== formData.confirmPassword}
                  >
                    Sign Up
                  </button>
                </div>
                
                {/* Required Fields Note */}
                <div className="text-muted text-center mb-3">
                  <small><span className="text-danger">*</span> Required fields</small>
                </div>
                
                {/* Login Link */}
                <div className="text-center">
                  <p className="mb-0">
                    Already have an account? <a href="/login" className="text-decoration-none">Login here</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;