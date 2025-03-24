import React, { useState, useEffect } from "react";
import { Search, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from '../pages/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  // Check local storage for user session on component mount
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem("userSession"));
    if (userSession && userSession.name) {
      setUsername(userSession.name);
      setUserDetails(userSession); // Store all user details in state
    }
  }, []);

  // List of navbar items
  const navItems = [
    { label: "communities", link: "/communities" },
    { label: "FindFood", link: "/find-food" },
    { label: "Volunteers", link: "/volunteers" },
    { label: "Donors", link: "/donors" },
    { label: "MapTrack", link: "/maptrack" },
    { label: "FoodMart", link: "/foodmart" },
    { label: "Rewards", link: "/rewards" },
    { label: "AboutUs", link: "/aboutus" },
  ];

  // Filter the navbar items based on the search query
  const filteredSuggestions = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userSession");
    setUsername("");
    setUserDetails(null); // Clear user details
    window.location.href = "/"; // Redirect to home page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={Logo} alt="Logo" className="me-2" style={{ width: '30px', height: '30px' }} />
          <span className="fw-bold text-success">foodapp</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link" to={item.link}>
                  <span className="me-1"></span>{item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex me-3 position-relative">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Find a service"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(e.target.value.length > 0); // Show suggestions only if there's a query
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions when input loses focus
            />
            <button
              className="btn btn-outline-success position-absolute end-0 me-2 top-0 h-100 d-flex align-items-center"
              type="submit"
            >
              <Search size={18} />
            </button>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                className="position-absolute top-100 start-0 mt-2 w-100 bg-white border rounded shadow-lg"
                style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}
              >
                {filteredSuggestions.map((item, index) => (
                  <Link
                    key={index}
                    to={item.link}
                    className="dropdown-item d-block p-2 text-decoration-none text-dark"
                    onClick={() => {
                      setShowSuggestions(false); // Hide suggestions when an item is clicked
                      setSearchQuery(""); // Clear the search query
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="d-flex">
            {username ? (
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {username}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <User size={16} className="me-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <LogOut size={16} className="me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;