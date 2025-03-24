import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import logo from './images/logo.png';
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
                <div className="col-lg-4 mb-4 mb-lg-0">
                <div className="d-flex align-items-center mb-3">
                  <img src={logo} alt="Logo" className="me-2" style={{ width: '50px', height: '50px' }} />
                  <h5 className="mb-0 text-success">Padeyam</h5>
                </div>
                <p className=" mb-3">
                  Connecting excess food with those who need it most. Join our mission to reduce food waste and fight hunger in communities.
                </p>
                <div className="d-flex">
                  <a href="" className="text-white me-3">
                  <Facebook size={20} />
                  </a>
                  <a href="" className="text-white me-3">
                  <Twitter size={20} />
                  </a>
                  <a href="" className="text-white me-3">
                  <Instagram size={20} />
                  </a>
                  <a href="" className="text-white me-3">
                  <Linkedin size={20} />
                  </a>
                  <a href="" className="text-white">
                  <Youtube size={20} />
                  </a>
                </div>
                </div>

                {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className=" text-decoration-none hover-white">
                  🏠 Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/find-food" className=" text-decoration-none hover-white">
                  🍲 Find Food
                </a>
              </li>
              <li className="mb-2">
                <a href="/donate-food" className=" text-decoration-none hover-white">
                  🎁 Donate Food
                </a>
              </li>
              <li className="mb-2">
                <a href="/major-donors" className=" text-decoration-none hover-white">
                  🏅 Major Donors
                </a>
              </li>
              <li className="mb-2">
                <a href="/communities" className="text-decoration-none hover-white">
                  💬 Communities
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/about" className="text-decoration-none hover-white">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/faq" className="text-decoration-none hover-white">
                  FAQ
                </a>
              </li>
              <li className="mb-2">
                <a href="/blog" className="text-decoration-none hover-white">
                  Blog
                </a>
              </li>
              <li className="mb-2">
                <a href="/volunteer" className="text-decoration-none hover-white">
                  Volunteer
                </a>
              </li>
              <li className="mb-2">
                <a href="/partners" className="text-decoration-none hover-white">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-lg-4 col-md-12">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <MapPin size={18} className="text-success mt-1 me-2" />
                <span className="text-muted">123 Community Way, Food City, FC 12345</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Phone size={18} className="text-success me-2" />
                <a href="tel:+15551234567" className=" text-decoration-none">
                  (555) 123-4567
                </a>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <Mail size={18} className="text-success me-2" />
                <a href="mailto:info@foodshare.org" className="text-decoration-none">
                  info@foodshare.org
                </a>
              </li>
            </ul>
            <div className="mt-3">
              <button className="btn btn-outline-success" type="button">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Terms */}
        <hr className="mt-4 mb-3 border-secondary" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <small className="text-muted">
              &copy; {new Date().getFullYear()} FoodShare. All rights reserved.
            </small>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="/terms" className="me-3 text-decoration-none small">
              Terms of Service
            </a>
            <a href="/privacy" className="text-decoration-none small">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      
      {/* Add custom style for hover effect */}
      <style jsx>{`
        .hover-white:hover {
          color: white !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;