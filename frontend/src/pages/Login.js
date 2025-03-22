import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password, role });
    // Here you would typically call your authentication API
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow mt-5">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Login</h2>
              
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
                  <button type="submit" className="btn btn-primary">Login</button>
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