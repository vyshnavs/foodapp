import React from 'react';
import HeoImg from './images/heroimages/img1.png';
const HeroSection = () => {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
            <h1 className="display-4 fw-bold mb-4">End Food Waste, Feed Communities</h1>
            <p className="lead mb-4">
              Connect excess food with those who need it most. Join our mission to reduce food waste and fight hunger in communities.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
              <a href="/find-food" className="btn btn-success btn-lg me-2 mb-2">
                <span className="me-2">🟢</span> Find Food
              </a>
              <a href="/donate-food" className="btn btn-danger btn-lg mb-2">
                <span className="me-2">🔴</span> Donate Now
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <img 
              src={HeoImg}
              alt="Food Sharing" 
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;