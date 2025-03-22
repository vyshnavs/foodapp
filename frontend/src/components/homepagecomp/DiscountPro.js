import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Percent, Filter } from 'lucide-react';

const DiscountedProducts = () => {
  // Sample data for discounted products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Organic Milk",
      market: "Fresh Market",
      image: "/api/placeholder/300/200",
      expiry: "March 23, 2025",
      originalPrice: 4.99,
      discountedPrice: 1.99,
      discountPercentage: 60,
      location: "Downtown",
      category: "Dairy"
    },
    {
      id: 2,
      name: "Assorted Vegetables Pack",
      market: "Green Grocer",
      image: "/api/placeholder/300/200",
      expiry: "March 24, 2025",
      originalPrice: 8.99,
      discountedPrice: 3.59,
      discountPercentage: 60,
      location: "Westside",
      category: "Produce"
    },
    {
      id: 3,
      name: "Freshly Baked Bread",
      market: "City Bakery",
      image: "/api/placeholder/300/200",
      expiry: "March 23, 2025",
      originalPrice: 3.99,
      discountedPrice: 1.59,
      discountPercentage: 60,
      location: "Northside",
      category: "Bakery"
    },
    {
      id: 4,
      name: "Premium Yogurt Pack",
      market: "Dairy Direct",
      image: "/api/placeholder/300/200",
      expiry: "March 25, 2025",
      originalPrice: 6.99,
      discountedPrice: 2.79,
      discountPercentage: 60,
      location: "Downtown",
      category: "Dairy"
    },
    {
      id: 5,
      name: "Ready-to-eat Chicken Salad",
      market: "Meal Prep Co.",
      image: "/api/placeholder/300/200",
      expiry: "March 23, 2025",
      originalPrice: 7.99,
      discountedPrice: 2.99,
      discountPercentage: 63,
      location: "Eastside",
      category: "Ready Meals"
    },
    {
      id: 6,
      name: "Mixed Fruit Box",
      market: "Fruit Corner",
      image: "/api/placeholder/300/200",
      expiry: "March 24, 2025",
      originalPrice: 9.99,
      discountedPrice: 3.99,
      discountPercentage: 60,
      location: "Southside",
      category: "Produce"
    }
  ]);

  // Filter states
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [expiryFilter, setExpiryFilter] = useState('All Dates');
  const [discountFilter, setDiscountFilter] = useState('All Discounts');
  
  // Get unique locations for filter
  const locations = ['All Locations', ...new Set(products.map(product => product.location))];
  
  // Discount ranges
  const discountRanges = [
    'All Discounts',
    '50% and above',
    '60% and above',
    '70% and above',
    '80% and above'
  ];
  
  // Expiry date ranges
  const expiryRanges = [
    'All Dates',
    'Today',
    'Tomorrow',
    'This Week'
  ];
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    let matchesLocation = locationFilter === 'All Locations' || product.location === locationFilter;
    let matchesDiscount = discountFilter === 'All Discounts' || 
      (discountFilter === '50% and above' && product.discountPercentage >= 50) ||
      (discountFilter === '60% and above' && product.discountPercentage >= 60) ||
      (discountFilter === '70% and above' && product.discountPercentage >= 70) ||
      (discountFilter === '80% and above' && product.discountPercentage >= 80);
    
    // Simplified expiry check - in a real app, you'd use proper date comparison
    let matchesExpiry = expiryFilter === 'All Dates' || 
      (expiryFilter === 'Today' && product.expiry.includes("March 23")) ||
      (expiryFilter === 'Tomorrow' && product.expiry.includes("March 24")) ||
      (expiryFilter === 'This Week' && (product.expiry.includes("March 23") || 
                                       product.expiry.includes("March 24") || 
                                       product.expiry.includes("March 25")));
    
    return matchesLocation && matchesDiscount && matchesExpiry;
  });

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="mb-1">Discounted Products</h2>
            <p className="text-muted">Help reduce food waste with these great deals</p>
          </div>
          <span className="badge bg-success p-2">
            <Percent size={16} className="me-1" /> Save up to 80%
          </span>
        </div>
        
        {/* Filters */}
        <div className="card mb-4 border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <Filter size={20} className="text-secondary me-2" />
              <h5 className="mb-0">Filter Products</h5>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <MapPin size={18} />
                  </span>
                  <select 
                    className="form-select"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Clock size={18} />
                  </span>
                  <select 
                    className="form-select"
                    value={expiryFilter}
                    onChange={(e) => setExpiryFilter(e.target.value)}
                  >
                    {expiryRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Percent size={18} />
                  </span>
                  <select 
                    className="form-select"
                    value={discountFilter}
                    onChange={(e) => setDiscountFilter(e.target.value)}
                  >
                    {discountRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product cards */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 border-0 shadow-sm hover-shadow">
                  <div className="position-relative">
                    <img 
                      src={product.image} 
                      className="card-img-top" 
                      alt={product.name}
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 bg-danger text-white py-1 px-2 m-2 rounded">
                      <small className="fw-bold">{product.discountPercentage}% OFF</small>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-light text-secondary">{product.market}</span>
                      <div className="d-flex align-items-center">
                        <Clock size={14} className="text-secondary me-1" />
                        <small className="text-muted">Expires: {product.expiry}</small>
                      </div>
                    </div>
                    <h5 className="card-title">{product.name}</h5>
                    <div className="mb-2">
                      <span className="text-decoration-line-through text-muted me-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="fw-bold text-danger fs-5">
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <MapPin size={16} className="text-secondary me-1" />
                      <span className="text-muted">{product.location}</span>
                    </div>
                    <button className="btn btn-success w-100">
                      <DollarSign size={16} className="me-1" /> Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="alert alert-info">
                No products match your filter criteria. Please try different filters.
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-4">
          <button className="btn btn-outline-success">View All Discounted Products</button>
        </div>
      </div>
    </section>
  );
};

export default DiscountedProducts;