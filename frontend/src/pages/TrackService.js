import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const FoodVolunteerTracker = () => {
  // Map state - centered on India
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(78.9629); // India's approximate longitude
  const [lat, setLat] = useState(20.5937); // India's approximate latitude
  const [zoom, setZoom] = useState(5); // Zoomed out to show more of India

  // Search state
  const [searchAddress, setSearchAddress] = useState('');
  const [searchRadius, setSearchRadius] = useState(5);
  const [filterType, setFilterType] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  // Results state
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample Indian states and cities
  const indianStates = [
    { value: 'all', label: 'All States' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'uttar_pradesh', label: 'Uttar Pradesh' }
  ];

  // Cities based on selected state
  const getCitiesForState = (state) => {
    switch(state) {
      case 'delhi':
        return [
          { value: 'all', label: 'All Cities' },
          { value: 'new_delhi', label: 'New Delhi' },
        ];
      case 'maharashtra':
        return [
          { value: 'all', label: 'All Cities' },
          { value: 'mumbai', label: 'Mumbai' },
          { value: 'pune', label: 'Pune' },
          { value: 'nagpur', label: 'Nagpur' }
        ];
      case 'tamil_nadu':
        return [
          { value: 'all', label: 'All Cities' },
          { value: 'chennai', label: 'Chennai' },
          { value: 'coimbatore', label: 'Coimbatore' },
          { value: 'madurai', label: 'Madurai' }
        ];
      case 'karnataka':
        return [
          { value: 'all', label: 'All Cities' },
          { value: 'bangalore', label: 'Bangalore' },
          { value: 'mysore', label: 'Mysore' }
        ];
      case 'uttar_pradesh':
        return [
          { value: 'all', label: 'All Cities' },
          { value: 'lucknow', label: 'Lucknow' },
          { value: 'kanpur', label: 'Kanpur' },
          { value: 'agra', label: 'Agra' }
        ];
      default:
        return [{ value: 'all', label: 'All Cities' }];
    }
  };

  const [cities, setCities] = useState(getCitiesForState('all'));

  // Update cities when state changes
  useEffect(() => {
    setCities(getCitiesForState(selectedState));
    setSelectedCity('all');
  }, [selectedState]);

  // Sample data - Indian locations
  const mockData = [
    {
      id: 1,
      name: "Akshaya Patra Foundation",
      type: "food",
      address: "Mathura Road, New Delhi",
      coordinates: [28.6139, 77.2090], // Delhi
      state: "delhi",
      city: "new_delhi",
      availability: "Mon-Sat: 10am-4pm",
      items: ["Rice", "Dal", "Vegetables", "Chapati"],
      contact: "info@akshayapatra.org",
    },
    {
      id: 2,
      name: "Ravi Kumar",
      type: "volunteer",
      address: "Connaught Place, New Delhi",
      coordinates: [28.6292, 77.2183], // Delhi
      state: "delhi",
      city: "new_delhi",
      availability: "Weekends",
      skills: ["Delivery", "Cooking"],
      contact: "ravi@example.com",
    },
    {
      id: 3,
      name: "Mumbai Food Bank",
      type: "food",
      address: "Andheri East, Mumbai",
      coordinates: [19.0760, 72.8777], // Mumbai
      state: "maharashtra",
      city: "mumbai",
      availability: "Daily: 9am-5pm",
      items: ["Groceries", "Fresh produce", "Meals"],
      contact: "help@mumbaifoodbank.org",
    },
    {
      id: 4,
      name: "Anjali Desai",
      type: "volunteer",
      address: "Bandra West, Mumbai",
      coordinates: [19.0596, 72.8295], // Mumbai
      state: "maharashtra",
      city: "mumbai",
      availability: "Evenings after 6pm",
      skills: ["Delivery", "Food sorting"],
      contact: "anjali@example.com",
    },
    {
      id: 5,
      name: "Feed Chennai",
      type: "food",
      address: "T. Nagar, Chennai",
      coordinates: [13.0500, 80.2502], // Chennai
      state: "tamil_nadu",
      city: "chennai",
      availability: "Daily: 11am-3pm",
      items: ["Rice meals", "Breakfast", "Snacks"],
      contact: "info@feedchennai.org",
    },
    {
      id: 6,
      name: "Venkatesh R",
      type: "volunteer",
      address: "Adyar, Chennai",
      coordinates: [13.0012, 80.2565], // Chennai
      state: "tamil_nadu",
      city: "chennai",
      availability: "Mon-Fri evenings",
      skills: ["Cooking", "Organizing"],
      contact: "venkatesh@example.com",
    },
    {
      id: 7,
      name: "Bangalore Food Trust",
      type: "food",
      address: "Indiranagar, Bangalore",
      coordinates: [12.9784, 77.6408], // Bangalore
      state: "karnataka",
      city: "bangalore",
      availability: "Mon-Sat: 10am-6pm",
      items: ["Groceries", "Cooked meals", "Fruits"],
      contact: "contact@bangalorefoodtrust.org",
    },
    {
      id: 8,
      name: "Kiran Sharma",
      type: "volunteer",
      address: "Koramangala, Bangalore",
      coordinates: [12.9352, 77.6245], // Bangalore
      state: "karnataka",
      city: "bangalore",
      availability: "Weekends & holidays",
      skills: ["Delivery", "Distribution"],
      contact: "kiran@example.com",
    },
    {
      id: 9,
      name: "Lucknow Community Kitchen",
      type: "food",
      address: "Hazratganj, Lucknow",
      coordinates: [26.8467, 80.9462], // Lucknow
      state: "uttar_pradesh",
      city: "lucknow",
      availability: "Daily: 12pm-3pm",
      items: ["Biryani", "Curry", "Rotis", "Sweets"],
      contact: "help@lucknoweats.org",
    },
    {
      id: 10,
      name: "Amar Singh",
      type: "volunteer",
      address: "Gomti Nagar, Lucknow",
      coordinates: [26.8606, 81.0089], // Lucknow
      state: "uttar_pradesh",
      city: "lucknow",
      availability: "Anytime on call",
      skills: ["Driving", "Distribution", "Cooking"],
      contact: "amarsingh@example.com",
    },
  ];

  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Initialize the Leaflet map
    map.current = L.map(mapContainer.current).setView([lat, lng], zoom);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    // Try to get user's current location in India
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        map.current.setView([latitude, longitude], 12);
        setLng(longitude);
        setLat(latitude);
      });
    }

    // Update state on map move
    map.current.on('moveend', () => {
      const center = map.current.getCenter();
      setLng(center.lng.toFixed(4));
      setLat(center.lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  // Function to geocode an address in India
  const geocodeAddress = async (address) => {
    setLoading(true);

    try {
      // Simulate coordinates near the selected state/city for any address
      let simulatedLat, simulatedLng;

      if (selectedState !== 'all') {
        // Find a location in our mock data that matches the state/city filter
        const stateLocations = mockData.filter(loc => 
          loc.state === selectedState && 
          (selectedCity === 'all' || loc.city === selectedCity)
        );
        
        if (stateLocations.length > 0) {
          // Use coordinates from a random location in the filtered set
          const randomLocation = stateLocations[Math.floor(Math.random() * stateLocations.length)];
          simulatedLat = randomLocation.coordinates[0];
          simulatedLng = randomLocation.coordinates[1];
        } else {
          // Fallback to general India coordinates
          simulatedLat = 20.5937 + (Math.random() * 0.05 - 0.025);
          simulatedLng = 78.9629 + (Math.random() * 0.05 - 0.025);
        }
      } else {
        // General India coordinates
        simulatedLat = 20.5937 + (Math.random() * 0.05 - 0.025);
        simulatedLng = 78.9629 + (Math.random() * 0.05 - 0.025);
      }

      // Fly the map to the new location
      if (map.current) {
        map.current.setView([simulatedLat, simulatedLng], 13);
      }

      // Search for locations within radius
      searchLocations(simulatedLng, simulatedLat);
    } catch (error) {
      console.error("Error geocoding address:", error);
      setLoading(false);
    }
  };

  // Function to search for locations within radius
  const searchLocations = (centerLng, centerLat) => {
    // Filter our mock data based on distance, type, state, and city
    const results = mockData.filter((location) => {
      // Calculate rough distance (this is a simplified calculation)
      const distance =
        Math.sqrt(
          Math.pow(location.coordinates[1] - centerLng, 2) +
            Math.pow(location.coordinates[0] - centerLat, 2)
        ) * 111; // Convert to km (approximate)

      // Apply all filters
      const matchesType = filterType === 'all' || location.type === filterType;
      const matchesState = selectedState === 'all' || location.state === selectedState;
      const matchesCity = selectedCity === 'all' || location.city === selectedCity;

      return matchesType && matchesState && matchesCity && distance <= searchRadius;
    });

    setLocations(results);

    // Clear existing markers if map exists
    if (map.current) {
      map.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.current.removeLayer(layer);
        }
      });

      // Add new markers to the map
      results.forEach((location) => {
        const marker = L.marker([location.coordinates[0], location.coordinates[1]])
          .addTo(map.current)
          .bindPopup(
            <div>
              <h5>{location.name}</h5>
              <p>{location.type === 'food' ? 'Food Source' : 'Volunteer'}</p>
            </div>
          );

        // Open popup if this is the selected location
        if (selectedLocation?.id === location.id) {
          marker.openPopup();
        }
      });
    }

    setLoading(false);
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchAddress || selectedState !== 'all') {
      geocodeAddress(searchAddress);
    }
  };

  // Handle connecting with a location
  const handleConnect = (location) => {
    alert(`Connection request sent to ${location.name}!`);
  };

  // Navigate to state/city on map
  const navigateToLocation = (state, city) => {
    if (state === 'all') {
      // Center on India
      if (map.current) {
        map.current.setView([20.5937, 78.9629], 5);
      }
      return;
    }

    // Find a location that matches the state/city
    const stateLocations = mockData.filter(loc => 
      loc.state === state && 
      (city === 'all' || loc.city === city)
    );
    
    if (stateLocations.length > 0) {
      const centerLoc = stateLocations[0];
      if (map.current) {
        map.current.setView(
          [centerLoc.coordinates[0], centerLoc.coordinates[1]], 
          city === 'all' ? 8 : 12
        );
      }
    }
  };

  // Effect to navigate to location when state/city changes
  useEffect(() => {
    navigateToLocation(selectedState, selectedCity);
  }, [selectedState, selectedCity]);

  // Simplified filter options
  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'food', label: 'Food' },
    { value: 'volunteer', label: 'Volunteers' },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div
          className="col-md-4 col-lg-3 bg-light p-4"
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <h2 className="mb-4 text-primary">
            <i className="bi bi-geo-alt-fill me-2"></i>
            India Food & Helper Finder
          </h2>

          {/* Location Filters */}
          <div className="mb-4">
            <label className="form-label fw-bold">Select Location</label>
            <div className="mb-3">
              <select 
                className="form-select mb-2"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                {indianStates.map(state => (
                  <option key={state.value} value={state.value}>{state.label}</option>
                ))}
              </select>
              
              <select 
                className="form-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={selectedState === 'all'}
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>{city.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Simplified Search Form */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="mb-3">
              <label htmlFor="address" className="form-label fw-bold">
                Where are you looking?
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="address"
                placeholder="Your address or locality"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="radius" className="form-label">
                <span className="fw-bold">How far can you travel?</span>
                <span className="ms-2 badge bg-primary rounded-pill">
                  {searchRadius} km
                </span>
              </label>
              <input
                type="range"
                className="form-range"
                id="radius"
                min="1"
                max="50"
                value={searchRadius}
                onChange={(e) => setSearchRadius(parseInt(e.target.value))}
              />
              <div className="d-flex justify-content-between small text-muted">
                <span>Nearby</span>
                <span>Far</span>
              </div>
            </div>

            {/* Simplified Filter Options */}
            <div className="mb-4">
              <label className="form-label fw-bold">What are you looking for?</label>
              <div className="d-flex gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={`btn ${
                      filterType === option.value ? 'btn-primary' : 'btn-outline-primary'
                    }`}
                    onClick={() => setFilterType(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Searching...
                </>
              ) : (
                <>
                  <i className="bi bi-search me-2"></i>Find Help
                </>
              )}
            </button>
          </form>

          {/* Results List */}
          <div className="results mt-4">
            <h4 className="mb-3">
              {locations.length > 0
                ? `Found ${locations.length} ${
                    filterType === 'all'
                      ? 'Results'
                      : filterType === 'food'
                      ? 'Food Sources'
                      : 'Volunteers'
                  }`
                : 'Search Results'}
            </h4>

            {locations.length === 0 && !loading && (
              <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                Select a location and search to find help near you.
              </div>
            )}

            {locations.map((location) => (
              <div
                key={location.id}
                className={`card mb-3 ${
                  selectedLocation?.id === location.id ? 'border-primary shadow' : ''
                }`}
                onClick={() => setSelectedLocation(location)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">{location.name}</h5>
                    <span
                      className={`badge ${
                        location.type === 'food' ? 'bg-success' : 'bg-info'
                      }`}
                    >
                      {location.type === 'food' ? 'Food Source' : 'Helper'}
                    </span>
                  </div>

                  <p className="card-text mb-1">
                    <i className="bi bi-geo-alt me-1"></i>
                    {location.address}
                  </p>

                  <p className="card-text mb-2">
                    <i className="bi bi-clock me-1"></i>
                    Available: {location.availability}
                  </p>

                  {location.type === 'food' && (
                    <div className="mb-2">
                      <div className="fw-bold mb-1">
                        <i className="bi bi-basket2 me-1"></i>Provides:
                      </div>
                      <div className="d-flex flex-wrap">
                        {location.items.map((item, index) => (
                          <span key={index} className="badge bg-light text-dark me-1 mb-1">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {location.type === 'volunteer' && (
                    <div className="mb-2">
                      <div className="fw-bold mb-1">
                        <i className="bi bi-tools me-1"></i>Can Help With:
                      </div>
                      <div className="d-flex flex-wrap">
                        {location.skills.map((skill, index) => (
                          <span key={index} className="badge bg-light text-dark me-1 mb-1">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="d-flex mt-3">
                    <button
                      className="btn btn-primary flex-grow-1 me-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(location);
                      }}
                    >
                      <i className="bi bi-telephone-fill me-1"></i>
                      Contact Now
                    </button>

                    <button
                      className="btn btn-outline-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLocation(location);
                        map.current.setView([location.coordinates[0], location.coordinates[1]], 15);
                      }}
                    >
                      <i className="bi bi-map"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div
          className="col-md-8 col-lg-9 p-0 position-relative"
          style={{ height: '100vh' }}
        >
          <div
            ref={mapContainer}
            className="w-100 h-100"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodVolunteerTracker;