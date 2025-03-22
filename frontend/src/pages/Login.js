import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Your existing fetchData function
export const fetchData = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/users/getData");
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchData();
        setUserData(data);
        setDataFetched(true);
        console.log("User data fetched successfully");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Unable to connect to the server. Please try again later.");
      }
    };

    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Check if data has been fetched
    if (!dataFetched || !userData) {
      setError("Still loading user data. Please wait a moment and try again.");
      setLoading(false);
      return;
    }
    
    try {
      // Find the user that matches the provided credentials
      const matchedUser = userData.find(user => 
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
              
              {!dataFetched && !error && (
                <div className="alert alert-info" role="alert">
                  Loading user data...
                </div>
              )}
              
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
                    disabled={!dataFetched}
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
                    disabled={!dataFetched}
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
                      disabled={!dataFetched}
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
                      disabled={!dataFetched}
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
                      disabled={!dataFetched}
                    />
                    <label className="form-check-label" htmlFor="recipient">Recipient</label>
                  </div>
                </div>
                
                {/* Login Button */}
                <div className="d-grid mb-3">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading || !dataFetched}
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