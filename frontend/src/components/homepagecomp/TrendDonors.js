import React from 'react';
import { Award, Users, ShoppingBag } from 'lucide-react';

const MajorDonors = () => {
  // Sample data
  const donors = [
    {
      id: 1,
      name: 'Fresh Foods Market',
      logo: '/api/placeholder/120/120',
      impact: '5,000+ meals donated',
      description: 'Supporting our community with fresh food since 2015.'
    },
    {
      id: 2,
      name: 'City Bakery Chain',
      logo: '/api/placeholder/120/120',
      impact: '3,200+ bread loaves shared',
      description: 'Committed to zero waste and community nourishment.'
    },
    {
      id: 3,
      name: 'Harvest Restaurant Group',
      logo: '/api/placeholder/120/120',
      impact: '8,500+ prepared meals',
      description: 'Turning excess into opportunity for those in need.'
    },
    {
      id: 4, 
      name: 'Nourish Foundation',
      logo: '/api/placeholder/120/120',
      impact: '10,000+ families supported',
      description: 'Dedicated to ending food insecurity in our communities.'
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">Connect with Major Donors</h2>
          <p className="lead text-muted">
            These organizations help make our mission possible. Join them in making a difference.
          </p>
        </div>
        
        <div className="row mb-5">
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="card-body">
                <Award size={48} className="text-success mb-3" />
                <h3 className="h4 mb-3">12,000+</h3>
                <p className="text-muted">Meals Donated Monthly</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="card-body">
                <Users size={48} className="text-success mb-3" />
                <h3 className="h4 mb-3">50+</h3>
                <p className="text-muted">Business Partners</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm text-center p-4">
              <div className="card-body">
                <ShoppingBag size={48} className="text-success mb-3" />
                <h3 className="h4 mb-3">85%</h3>
                <p className="text-muted">Reduction in Food Waste</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="row">
          {donors.map(donor => (
            <div key={donor.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <div className="card-body p-4">
                  <h5 className="card-title">{donor.name}</h5>
                  <p className="text-success fw-bold mb-2">{donor.impact}</p>
                  <p className="card-text text-muted mb-3">{donor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button className="btn btn-success">Partner With Us</button>
        </div>
      </div>
    </section>
  );
};

export default MajorDonors;