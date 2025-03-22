import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const VolunteerListing = () => {
  // Sample volunteer data
  const initialVolunteers = [
    { id: 1, name: 'Sarah Johnson', location: 'Seattle', workingDays: ['Monday', 'Wednesday', 'Friday'], photo: '/api/placeholder/80/80' },
    { id: 2, name: 'Miguel Rodriguez', location: 'Portland', workingDays: ['Tuesday', 'Thursday', 'Saturday'], photo: '/api/placeholder/80/80' },
    { id: 3, name: 'Aisha Patel', location: 'Seattle', workingDays: ['Monday', 'Tuesday', 'Friday'], photo: '/api/placeholder/80/80' },
    { id: 4, name: 'David Kim', location: 'Vancouver', workingDays: ['Wednesday', 'Thursday', 'Sunday'], photo: '/api/placeholder/80/80' },
    { id: 5, name: 'Emma Wilson', location: 'Portland', workingDays: ['Monday', 'Wednesday', 'Saturday'], photo: '/api/placeholder/80/80' },
    { id: 6, name: 'James Chen', location: 'Vancouver', workingDays: ['Tuesday', 'Friday', 'Sunday'], photo: '/api/placeholder/80/80' }
  ];

  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Get unique locations for filter dropdown
  const locations = ['All', ...new Set(initialVolunteers.map(v => v.location))];
  
  // Get unique working days for filter dropdown
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const days = ['All', ...allDays];

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter and sort volunteers
  const filteredVolunteers = initialVolunteers.filter(volunteer => {
    // Filter by search term
    const matchesSearch = volunteer.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by location
    const matchesLocation = selectedLocation === 'All' || volunteer.location === selectedLocation;
    
    // Filter by working day
    const matchesDay = selectedDay === 'All' || volunteer.workingDays.includes(selectedDay);
    
    return matchesSearch && matchesLocation && matchesDay;
  }).sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'location') {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 fw-bold text-primary mb-4">
            <i className="bi bi-people-fill me-2"></i>
            Volunteer Directory
          </h1>
        </div>
      </div>
      
      {/* Search and Filter Options */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search volunteers..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <label htmlFor="searchInput">Search by Name</label>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-floating">
            <select 
              className="form-select" 
              id="sortBySelect"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="location">Location</option>
            </select>
            <label htmlFor="sortBySelect">Sort By</label>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-floating">
            <select 
              className="form-select" 
              id="locationSelect"
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <label htmlFor="locationSelect">Filter by Location</label>
          </div>
        </div>
        
        <div className="col-md-3">
          <div className="form-floating">
            <select 
              className="form-select" 
              id="daySelect"
              value={selectedDay} 
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              {days.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <label htmlFor="daySelect">Filter by Working Day</label>
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="alert alert-info">
            <i className="bi bi-info-circle me-2"></i>
            {filteredVolunteers.length} volunteers found
          </div>
        </div>
      </div>
      
      {/* Volunteer Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredVolunteers.map((volunteer) => (
          <div key={volunteer.id} className="col">
            <div className="card h-100 shadow-sm hover-shadow transition-all">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <img 
                    src={volunteer.photo} 
                    alt={volunteer.name} 
                    className="rounded-circle me-3 border border-3 border-primary"
                    width="70" 
                    height="70" 
                  />
                  <div>
                    <h5 className="card-title mb-0">{volunteer.name}</h5>
                    <p className="card-subtitle text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {volunteer.location}
                    </p>
                  </div>
                </div>
                
                <h6 className="card-subtitle mb-2 text-primary fw-bold">
                  <i className="bi bi-calendar-week me-1"></i>
                  Working Days:
                </h6>
                <div className="mb-3">
                  {volunteer.workingDays.map(day => (
                    <span key={day} className="badge bg-primary bg-opacity-10 text-primary me-1 mb-1 px-2 py-1">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-footer border-0 bg-white pb-3">
                <button className="btn btn-primary w-100">
                  <i className="bi bi-person-plus me-2"></i>
                  Connect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredVolunteers.length === 0 && (
        <div className="row mt-5">
          <div className="col-12 text-center py-5">
            <div className="display-6 text-muted mb-3">
              <i className="bi bi-search me-2"></i>
              No Results Found
            </div>
            <p className="lead text-secondary">
              No volunteers match your search criteria. Try adjusting your filters.
            </p>
            <button 
              className="btn btn-outline-primary mt-3"
              onClick={() => {
                setSearchTerm('');
                setSelectedDay('All');
                setSelectedLocation('All');
              }}
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerListing;