import React, { useState } from "react";
import { Search } from "lucide-react";

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src="/api/placeholder/40/40" alt="Logo" className="me-2" />
          <span className="fw-bold text-success"></span>
        </a>

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
            <li className="nav-item">
              <a className="nav-link active" href="/">
                <span className="me-1"></span>Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/find-food">
                <span className="me-1"></span>Food
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/donate-food">
                <span className="me-1"></span>Volunteers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/major-donors">
                <span className="me-1"></span>Donors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/communities">
                <span className="me-1"></span>Communities
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                <span className="me-1"></span> Contact
              </a>
            </li>
          </ul>

          <form className="d-flex me-3 position-relative">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Find a service"
            />
            <button
              className="btn btn-outline-success position-absolute end-0 me-2 top-0 h-100 d-flex align-items-center"
              type="submit"
            >
              <Search size={18} />
            </button>
          </form>

          <div className="d-flex">
            <a href="/login" className="btn btn-outline-primary me-2">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
