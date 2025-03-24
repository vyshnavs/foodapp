import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';

const FoodItemCard = ({ item, expandedItemId, toggleItemExpansion, daysUntilExpiry, formatDate }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm">
        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
        <div 
          className="position-absolute top-0 end-0 m-2 p-2 rounded text-white"
          style={{
            backgroundColor: daysUntilExpiry(item.expiryDate) <= 2 ? 'red' : daysUntilExpiry(item.expiryDate) <= 5 ? 'orange' : 'green'
          }}
        >
          {daysUntilExpiry(item.expiryDate) <= 0 ? 'Expired' : daysUntilExpiry(item.expiryDate) + ' days left'}
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="badge bg-secondary me-1">{item.category}</p>

          <div className="d-flex align-items-center text-muted mb-2">
            <Calendar size={16} className="me-2" />
            <small>Expires: {formatDate(item.expiryDate)}</small>
          </div>
          <div className="d-flex align-items-center text-muted mb-3">
            <MapPin size={16} className="me-2" />
            <small>{item.location} ({item.distance} miles away)</small>
          </div>

          <button className="btn btn-primary w-100 mb-2" onClick={() => toggleItemExpansion(item.id)}>
            {expandedItemId === item.id ? 'Hide Details' : 'View Details'}
          </button>

          {expandedItemId === item.id && (
            <div className="bg-light p-3 rounded">
              <h6>Donor Information</h6>
              <p className="mb-1">{item.donorName}</p>
              <p className="text-muted small">{item.donorAddress}</p>
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-success w-100">Request Item</button>
                <button className="btn btn-outline-secondary">
                  <MapPin size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Food = () => {
  const [allItems, setAllItems] = useState([
    {
      id: 1,
      name: "Fresh Apples",
      description: "A bag of organic apples, locally grown",
      expiryDate: "2025-03-28",
      location: "Downtown",
      donorName: "Sarah K.",
      donorAddress: "123 Main St, Downtown",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 0.8,
      category: "Fruits"
    },
    {
      id: 2,
      name: "Homemade Bread",
      description: "Freshly baked sourdough bread",
      expiryDate: "2025-03-24",
      location: "Westside",
      donorName: "Michael T.",
      donorAddress: "456 Oak Ave, Westside",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 1.2,
      category: "Bakery"
    },
    {
      id: 3,
      name: "Pasta Sauce",
      description: "Homemade tomato pasta sauce, vegetarian",
      expiryDate: "2025-04-05",
      location: "Eastside",
      donorName: "Jamie L.",
      donorAddress: "789 Pine St, Eastside",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 2.5,
      category: "Sauces"
    },
    {
      id: 4,
      name: "Butter Chicken",
      description: "Homemade butter chicken curry with spices",
      expiryDate: "2025-03-25",
      location: "Northside",
      donorName: "Priya R.",
      donorAddress: "234 Maple Dr, Northside",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 1.7,
      category: "Indian"
    },
    {
      id: 5,
      name: "Vegetable Biryani",
      description: "Fragrant basmati rice with mixed vegetables and aromatic spices",
      expiryDate: "2025-03-26",
      location: "Downtown",
      donorName: "Anand S.",
      donorAddress: "567 Center St, Downtown",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 0.5,
      category: "Indian"
    },
    {
      id: 6,
      name: "Homemade Samosas",
      description: "Crispy fried pastries filled with spiced potatoes and peas",
      expiryDate: "2025-03-25",
      location: "Eastside",
      donorName: "Neha P.",
      donorAddress: "890 East Ave, Eastside",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 2.1,
      category: "Indian"
    },
    {
      id: 7,
      name: "Paneer Tikka",
      description: "Marinated and grilled Indian cottage cheese with spices",
      expiryDate: "2025-03-24",
      location: "Southside",
      donorName: "Raj K.",
      donorAddress: "123 South Blvd, Southside",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 3.2,
      category: "Indian"
    },
    {
      id: 8,
      name: "Chana Masala",
      description: "Spicy chickpea curry with tomatoes and onions",
      expiryDate: "2025-03-27",
      location: "Westside",
      donorName: "Sonia G.",
      donorAddress: "456 West St, Westside",
      imageUrl: "https://via.placeholder.com/300x200",
      distance: 1.9,
      category: "Indian"
    }
  ]);

  const [items, setItems] = useState([]);
  const [sortBy, setSortBy] = useState("expiryDate");
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "all",
    category: "all",
    expiryRange: "all"
  });

  // Get unique locations and categories for filter dropdowns
  const locations = ["all", ...new Set(allItems.map(item => item.location))];
  const categories = ["all", ...new Set(allItems.map(item => item.category))];

  useEffect(() => {
    // Apply search and filters
    let filteredItems = [...allItems];
    
    // Apply search
    if (searchTerm) {
      filteredItems = filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply location filter
    if (filters.location !== "all") {
      filteredItems = filteredItems.filter(item => item.location === filters.location);
    }
    
    // Apply category filter
    if (filters.category !== "all") {
      filteredItems = filteredItems.filter(item => item.category === filters.category);
    }
    
    // Apply expiry filter
    if (filters.expiryRange !== "all") {
      const today = new Date();
      if (filters.expiryRange === "soon") {
        filteredItems = filteredItems.filter(item => {
          const days = Math.ceil((new Date(item.expiryDate) - today) / (1000 * 60 * 60 * 24));
          return days <= 3 && days >= 0;
        });
      } else if (filters.expiryRange === "week") {
        filteredItems = filteredItems.filter(item => {
          const days = Math.ceil((new Date(item.expiryDate) - today) / (1000 * 60 * 60 * 24));
          return days > 3 && days <= 7;
        });
      } else if (filters.expiryRange === "later") {
        filteredItems = filteredItems.filter(item => {
          const days = Math.ceil((new Date(item.expiryDate) - today) / (1000 * 60 * 60 * 24));
          return days > 7;
        });
      }
    }

    // Apply sorting
    if (sortBy === "expiryDate") {
      filteredItems.sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
    } else if (sortBy === "location") {
      filteredItems.sort((a, b) => a.distance - b.distance);
    }
    
    setItems(filteredItems);
  }, [allItems, searchTerm, filters, sortBy]);

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const toggleItemExpansion = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const daysUntilExpiry = (dateString) => {
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Food Items</h2>
        <div className="d-flex align-items-center">
          <span className="me-2">Sort by:</span>
          <select className="form-select" value={sortBy} onChange={(e) => handleSort(e.target.value)}>
            <option value="expiryDate">Expiry Date</option>
            <option value="location">Distance</option>
          </select>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text">
                  <Search size={16} />
                </span>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search food items..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <Filter size={16} className="me-2" />
                <span className="me-2">Filters:</span>
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              >
                <option value="all">All Locations</option>
                {locations.filter(loc => loc !== 'all').map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select"
                value={filters.expiryRange}
                onChange={(e) => handleFilterChange('expiryRange', e.target.value)}
              >
                <option value="all">All Expiry Dates</option>
                <option value="soon">Expires Soon (0-3 days)</option>
                <option value="week">This Week (4-7 days)</option>
                <option value="later">Later (&gt;7 days)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-3">
        <p className="text-muted">{items.length} items found</p>
      </div>

      {/* Food Items Grid */}
      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <FoodItemCard 
              key={item.id} 
              item={item} 
              expandedItemId={expandedItemId} 
              toggleItemExpansion={toggleItemExpansion} 
              daysUntilExpiry={daysUntilExpiry} 
              formatDate={formatDate} 
            />
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No food items match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;