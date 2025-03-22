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
  // Map state
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.4376);
  const [lat, setLat] = useState(37.7577);
  const [zoom, setZoom] = useState(12);

  // Search state
  const [searchAddress, setSearchAddress] = useState('');
  const [searchRadius, setSearchRadius] = useState(5);
  const [filterType, setFilterType] = useState('all');

  // Results state
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sample data - in a real app, this would come from your API
  const mockData = [
    {
      id: 1,
      name: "Community Food Bank",
      type: "food",
      address: "123 Main St, San Francisco, CA",
      coordinates: [37.773, -122.431],
      availability: "Mon-Fri: 9am-5pm",
      items: ["Rice", "Beans", "Canned goods", "Fresh produce"],
      contact: "info@communityfoodbank.org",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      type: "volunteer",
      address: "456 Market St, San Francisco, CA",
      coordinates: [37.763, -122.415],
      availability: "Weekends",
      skills: ["Delivery", "Meal prep"],
      contact: "sarahj@example.com",
    },
    {
      id: 3,
      name: "Downtown Soup Kitchen",
      type: "food",
      address: "789 Mission St, San Francisco, CA",
      coordinates: [37.781, -122.401],
      availability: "Daily: 11am-2pm",
      items: ["Hot meals", "Sandwiches"],
      contact: "contact@downtownsoup.org",
    },
    {
      id: 4,
      name: "Miguel Rodriguez",
      type: "volunteer",
      address: "101 Valencia St, San Francisco, CA",
      coordinates: [37.768, -122.422],
      availability: "Evenings after 6pm",
      skills: ["Delivery", "Food sorting"],
      contact: "miguel@example.com",
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

    // Try to get user's current location
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

  // Function to simulate geocoding an address
  const geocodeAddress = async (address) => {
    setLoading(true);

    try {
      // Simulate coordinates near San Francisco for any address
      const simulatedLng = -122.4194 + (Math.random() * 0.05 - 0.025);
      const simulatedLat = 37.7749 + (Math.random() * 0.05 - 0.025);

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
    // Filter our mock data based on distance
    const results = mockData.filter((location) => {
      // Calculate rough distance (this is a simplified calculation)
      const distance =
        Math.sqrt(
          Math.pow(location.coordinates[1] - centerLng, 2) +
            Math.pow(location.coordinates[0] - centerLat, 2)
        ) * 111; // Convert to km (approximate)

      // Filter by type and distance
      return (
        (filterType === 'all' || location.type === filterType) &&
        distance <= searchRadius
      );
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
            `<h5>${location.name}</h5><p>${location.type === 'food' ? 'Food Source' : 'Volunteer'}</p>`
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
    if (searchAddress) {
      geocodeAddress(searchAddress);
    }
  };

  // Handle connecting with a location
  const handleConnect = (location) => {
    alert(`Connection request sent to ${location.name}!`);
  };

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
            Food & Helper Finder
          </h2>

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
                placeholder="Your address or neighborhood"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                required
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
                Enter your location above to find help near you.
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