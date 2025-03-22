import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { fetchData } from '../connections/user';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Get all users data using your fetchData function
      const usersData = await fetchData();
      
      // Find the user that matches the provided credentials
      const matchedUser = usersData.find(user => 
        user.email === email && 
        user.password === password && 
        user.role === role
      );
      
      if (!matchedUser) {
        throw new Error('Invalid email, password, or role. Please try again.');
      }
      
      // Remove sensitive data before storing in local session
      const userSession = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
        // Add any other non-sensitive fields you want to keep
      };
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(userSession));
      
      // Also set to sessionStorage if you want it cleared on browser close
      sessionStorage.setItem('user', JSON.stringify(userSession));
      
      console.log('Login successful', userSession);
      
      // Redirect user to appropriate dashboard based on role
      window.location.href = `/${role}/dashboard`;
      
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow mt-5">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                {/* Password Input */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                {/* Role Selection */}
                <div className="mb-4">
                  <label className="form-label d-block">Select your role</label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="donor"
                      value="donor"
                      checked={role === 'donor'}
                      onChange={() => setRole('donor')}
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
                      checked={role === 'volunteer'}
                      onChange={() => setRole('volunteer')}
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
                      checked={role === 'recipient'}
                      onChange={() => setRole('recipient')}
                    />
                    <label className="form-check-label" htmlFor="recipient">Recipient</label>
                  </div>
                </div>
                
                {/* Login Button */}
                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
                
                {/* Register Link */}
                <div className="text-center">
                  <p className="mb-0">
                    Don't have an account? <a href="/signup" className="text-decoration-none">Register here</a>
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

export default LoginPage;