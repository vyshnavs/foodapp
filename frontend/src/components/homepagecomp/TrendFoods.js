import React from 'react';
import { MapPin, Clock, User } from 'lucide-react';

const ListedFoodsByDonors = () => {
  // Sample data
  const foodListings = [
    {
      id: 1,
      name: 'Fresh Salads & Sandwiches',
      image: '/api/placeholder/300/200',
      location: 'Green Cafe',
      expiry: '3 hours',
      donor: 'Green Cafe',
      quantity: '15 portions'
    },
    {
      id: 2,
      name: 'Bread & Pastries Assortment',
      image: '/api/placeholder/300/200',
      location: 'Family Bakery',
      expiry: '5 hours',
      donor: 'Family Bakery',
      quantity: '20 items'
    },
    {
      id: 3,
      name: 'Fresh Produce Bundle',
      image: '/api/placeholder/300/200',
      location: 'Local Farmer\'s Market',
      expiry: '8 hours',
      donor: 'Urban Farm Collective',
      quantity: '10 bundles'
    },
    {
      id: 4,
      name: 'Cooked Meals',
      image: '/api/placeholder/300/200',
      location: 'Community Kitchen',
      expiry: '4 hours',
      donor: 'Restaurant Alliance',
      quantity: '25 meals'
    },
    {
      id: 5,
      name: 'Dairy Products',
      image: '/api/placeholder/300/200',
      location: 'SuperMart',
      expiry: '6 hours',
      donor: 'SuperMart',
      quantity: '15 items'
    },
    {
      id: 6,
      name: 'Canned Goods Assortment',
      image: '/api/placeholder/300/200',
      location: 'Food Bank Central',
      expiry: '3 days',
      donor: 'Food Bank Central',
      quantity: '30 cans'
    }
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="text-center mb-5">Latest Food Donations</h2>
        
        <div className="row">
          {foodListings.map((food) => (
            <div key={food.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <img 
                  src={food.image} 
                  className="card-img-top" 
                  alt={food.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p className="card-text mb-1">
                    <small className="text-muted">Quantity: {food.quantity}</small>
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    <MapPin size={16} className="text-secondary me-1" />
                    <span className="text-muted">{food.location}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Clock size={16} className="text-secondary me-1" />
                    <span className="text-muted">Expires in: {food.expiry}</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <User size={16} className="text-secondary me-1" />
                    <span className="text-muted">Donor: {food.donor}</span>
                  </div>
                  <button className="btn btn-primary w-100">Request Food</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary">View All Available Food</button>
        </div>
      </div>
    </section>
  );
};

export default ListedFoodsByDonors;