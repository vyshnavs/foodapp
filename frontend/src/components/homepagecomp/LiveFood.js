import React, { useState } from 'react';
import { MapPin, Clock, Coffee, RefreshCw } from 'lucide-react';

const LiveFoodAvailability = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  
  // Sample data
  const [availableFood, setAvailableFood] = useState([
    { id: 1, name: 'Fresh Bread & Pastries', location: 'Downtown Bakery', expiry: '2 hours', type: 'Baked Goods' },
    { id: 2, name: 'Assorted Vegetables', location: 'Green Grocers', expiry: '4 hours', type: 'Produce' },
    { id: 3, name: 'Prepared Meals', location: 'Community Kitchen', expiry: '3 hours', type: 'Ready-to-eat' },
    { id: 4, name: 'Dairy Products', location: 'Local Market', expiry: '5 hours', type: 'Dairy' }
  ]);

  const handleRefresh = () => {
    // This would be replaced with an actual API call
    setLastRefreshed(new Date());
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Live Food Availability</h2>
          <div className="d-flex align-items-center">
            <small className="text-muted me-2">
              Last updated: {lastRefreshed.toLocaleTimeString()}
            </small>
            <button 
              className="btn btn-sm btn-outline-secondary d-flex align-items-center" 
              onClick={handleRefresh}
            >
              <RefreshCw size={16} className="me-1" /> Refresh
            </button>
          </div>
        </div>
        
        <div className="row mb-4">
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-light">
                <MapPin size={18} />
              </span>
              <select className="form-select">
                <option>All Locations</option>
                <option>Downtown</option>
                <option>Westside</option>
                <option>Northside</option>
                <option>Eastside</option>
              </select>
            </div>
          </div>
          
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="input-group">
              <span className="input-group-text bg-light">
                <Clock size={18} />
              </span>
              <select className="form-select">
                <option>All Expiry Times</option>
                <option>Within 1 hour</option>
                <option>Within 3 hours</option>
                <option>Within 6 hours</option>
                <option>Within 12 hours</option>
              </select>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-light">
                <Coffee size={18} />
              </span>
              <select className="form-select">
                <option>All Food Types</option>
                <option>Produce</option>
                <option>Baked Goods</option>
                <option>Dairy</option>
                <option>Ready-to-eat</option>
                <option>Canned Goods</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="row">
          {availableFood.map(food => (
            <div key={food.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <div className="mb-2 d-flex align-items-center">
                    <MapPin size={16} className="text-secondary me-1" />
                    <span className="text-muted">{food.location}</span>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <Clock size={16} className="text-secondary me-1" />
                    <span className="text-muted">Expires in: {food.expiry}</span>
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <Coffee size={16} className="text-secondary me-1" />
                    <span className="text-muted">{food.type}</span>
                  </div>
                  <button className="btn btn-success w-100">Request Food</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveFoodAvailability;