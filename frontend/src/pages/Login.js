import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);

  // Manually store user data in useEffect
  useEffect(() => {
    const users = [
      { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com', 
        password: 'password123', 
        role: 'donor', 
        phone: '123-456-7890', 
        address: '123 Main St, City, Country', 
        description: 'Regular donor helping the community.' 
      },
      { 
        id: 2, 
        name: 'Jane Doe', 
        email: 'jane@example.com', 
        password: 'password456', 
        role: 'volunteer', 
        phone: '987-654-3210', 
        address: '456 Elm St, City, Country', 
        description: 'Volunteer passionate about food distribution.' 
      },
     { 
        id: 3, 
        name: 'Sijin', 
        email: 'sijin@gmail.com', 
        password: 'Sijin@123', 
        role: 'volunteer', 
        phone: '9526245484', 
        address: 'kannur', 
        description: 'I love social service.' 
      },
       { 
        id: 4, 
        name: 'abijith', 
        email: 'abijith@gmail.com', 
        password: 'Abigith@123', 
        role: 'volunteer', 
        phone: '9526245484', 
        address: 'vadakara,kozhikode', 
        description: 'I love social service.' 
      }
    ];
    setUserData(users);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

      // Store additional user details in local storage
      const userSession = {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
        phone: matchedUser.phone,
        address: matchedUser.address,
        description: matchedUser.description,
      };

      // Store user data in localStorage for persistence
      localStorage.setItem('userSession', JSON.stringify(userSession));

      console.log('Login successful', userSession);

      // Redirect user to home page
      window.location.href = '/';

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      alert(err.message); // Show alert on failed login
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