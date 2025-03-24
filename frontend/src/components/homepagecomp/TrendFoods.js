import React from 'react';
import { MapPin, Clock, User } from 'lucide-react';
import img1 from './images/foodimages/img1.png';
import img2 from './images/foodimages/img2.png';
import img3 from './images/foodimages/img3.png';
import img4 from './images/foodimages/img4.png';
import img5 from './images/foodimages/img5.png';
import img6 from './images/foodimages/img6.png';
const ListedFoodsByDonors = () => {
  // Sample data
  const foodListings = [
    {
      id: 1,
      name: 'Fresh Salads & Sandwiches',
      image: img1,
      location: 'Green Cafe',
      expiry: '3 hours',
      donor: 'Green Cafe',
      quantity: '15 portions'
    },
    {
      id: 2,
      name: 'Bread & Pastries Assortment',
      image: img2,
      location: 'Family Bakery',
      expiry: '5 hours',
      donor: 'Family Bakery',
      quantity: '20 items'
    },
    {
      id: 3,
      name: 'Fresh Produce Bundle',
      image: img3,
      location: 'Local Farmer\'s Market',
      expiry: '8 hours',
      donor: 'Urban Farm Collective',
      quantity: '10 bundles'
    },
    {
      id: 4,
      name: 'Cooked Meals',
      image: img4,
      location: 'Community Kitchen',
      expiry: '4 hours',
      donor: 'Restaurant Alliance',
      quantity: '25 meals'
    },
    {
      id: 5,
      name: 'Dairy Products',
      image:  img5,
      location: 'SuperMart',
      expiry: '6 hours',
      donor: 'SuperMart',
      quantity: '15 items'
    },
    {
      id: 6,
      name: 'Canned Goods Assortment',
      image: img6,
      location: 'Food Bank Central',
      expiry: '3 days',
      donor: 'Food Bank Central',
      quantity: '30 cans'
    }
  ];

  return (
    <section className="py-5 bg-light">
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
                  <a href="#" className="btn btn-primary w-100">Request Food</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <a href="/find-food" className="btn btn-outline-primary">View All Available Food</a>
        </div>
      </div>
    </section>
  );
};

export default ListedFoodsByDonors;