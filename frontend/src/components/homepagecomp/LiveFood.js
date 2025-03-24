import React, { useState } from 'react';
import { MapPin, Clock, Coffee, RefreshCw } from 'lucide-react';
import Slider from 'react-slick'; // Import a slider library
import 'slick-carousel/slick/slick.css'; // Slider CSS
import 'slick-carousel/slick/slick-theme.css'; // Slider theme CSS

const LiveFoodAvailability = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Sample data
  const [availableFood, setAvailableFood] = useState([
    { id: 1, name: 'Fresh Bread & Pastries', location: 'Downtown Bakery', expiry: '2 hours', type: 'Baked Goods' },
    { id: 2, name: 'Assorted Vegetables', location: 'Green Grocers', expiry: '4 hours', type: 'Produce' },
    { id: 3, name: 'Prepared Meals', location: 'Community Kitchen', expiry: '3 hours', type: 'Ready-to-eat' },
    { id: 4, name: 'Dairy Products', location: 'Local Market', expiry: '5 hours', type: 'Dairy' },
    { id: 5, name: 'Canned Goods', location: 'Supermarket', expiry: '1 day', type: 'Canned Goods' },
  ]);

  // Function to get light color based on food type
  const getCardColor = (type) => {
    switch (type) {
      case 'Baked Goods':
        return '#FFF3E0'; // Light orange
      case 'Produce':
        return '#E8F5E9'; // Light green
      case 'Ready-to-eat':
        return '#FFEBEE'; // Light red
      case 'Dairy':
        return '#E3F2FD'; // Light blue
      case 'Canned Goods':
        return '#F3E5F5'; // Light purple
      default:
        return '#FFFFFF'; // White
    }
  };

  const handleRefresh = () => {
    // Simulate a refresh by updating the lastRefreshed time
    setLastRefreshed(new Date());
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-5 bg-light">
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

        {/* Slider for food items */}
        <Slider {...sliderSettings}>
          {availableFood.map((food) => (
            <div key={food.id} className="px-2">
              <div
                className="card h-100 border-0 shadow-sm hover-shadow"
                style={{ backgroundColor: getCardColor(food.type) }}
              >
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
        </Slider>
      </div>
    </section>
  );
};

export default LiveFoodAvailability;