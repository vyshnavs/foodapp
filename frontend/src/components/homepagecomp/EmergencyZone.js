import React, { useState } from 'react';
import { AlertTriangle, List, Map } from 'lucide-react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Sample GeoJSON data for regions
const regions = [
  {
    id: 1,
    name: 'North India',
    cases: 200,
    donations: 150,
    coordinates: [[28.6139, 77.2090], [30.9000, 75.8573], [31.1048, 77.1734]], // Delhi, Punjab, Himachal
  },
  {
    id: 2,
    name: 'South India',
    cases: 150,
    donations: 120,
    coordinates: [[13.0827, 80.2707], [12.9716, 77.5946], [17.3850, 78.4867]], // Chennai, Bangalore, Hyderabad
  },
  {
    id: 3,
    name: 'West India',
    cases: 180,
    donations: 90,
    coordinates: [[19.0760, 72.8777], [18.5204, 73.8567], [22.5726, 88.3639]], // Mumbai, Pune, Kolkata
  },
  {
    id: 4,
    name: 'East India',
    cases: 100,
    donations: 80,
    coordinates: [[22.5726, 88.3639], [20.2961, 85.8245], [26.8467, 80.9462]], // Kolkata, Bhubaneswar, Lucknow
  },
];

// Function to generate random dots for recipients and donations
const generateDots = () => {
  const dots = [];
  for (let i = 0; i < 100; i++) {
    const isDonation = Math.random() > 0.5; // Randomly assign as donation or recipient
    dots.push({
      id: i,
      type: isDonation ? 'donation' : 'recipient',
      coordinates: [
        18.5 + Math.random() * 10, // Random latitude within India
        72.5 + Math.random() * 10, // Random longitude within India
      ],
    });
  }
  return dots;
};

const dots = generateDots();

const EmergencyZones = () => {
  const [viewMode, setViewMode] = useState('map'); // 'list' or 'map'

  // Function to calculate donation recipient ratio and assign color
  const getColor = (donations, cases) => {
    const ratio = donations / cases;
    if (ratio >= 0.8) return '#E8F5E9'; // Light green
    if (ratio >= 0.5) return '#FFF3E0'; // Light orange
    return '#FFEBEE'; // Light red
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <AlertTriangle size={24} className="text-danger me-2" />
            <h2 className="mb-0">Emergency Zones</h2>
          </div>
          <div className="btn-group">
            <button
              className={`btn btn-sm ${viewMode === 'list' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} className="me-1" /> List View
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'map' ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setViewMode('map')}
            >
              <Map size={16} className="me-1" /> Map View
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="row">
            {regions.map((region) => (
              <div key={region.id} className="col-md-6 mb-4">
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{ backgroundColor: getColor(region.donations, region.cases) }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{region.name}</h5>
                    <div className="mb-3">
                      <p className="mb-1"><strong>Food Insecurity Cases:</strong> {region.cases}</p>
                      <p className="mb-0"><strong>Number of Donations:</strong> {region.donations}</p>
                    </div>
                    <a href="/login
                    " className="btn btn-light w-100">Donate Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <MapContainer
                center={[20.5937, 78.9629]} // Center of India
                zoom={5}
                style={{ height: '500px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Render regions */}
                {regions.map((region) => (
                  <GeoJSON
                    key={region.id}
                    data={{
                      type: 'FeatureCollection',
                      features: region.coordinates.map((coord) => ({
                        type: 'Feature',
                        properties: { name: region.name },
                        geometry: {
                          type: 'Point',
                          coordinates: coord,
                        },
                      })),
                    }}
                    style={{
                      fillColor: getColor(region.donations, region.cases),
                      fillOpacity: 0.7,
                      color: '#000',
                      weight: 1,
                    }}
                  />
                ))}
                {/* Render dots */}
                {dots.map((dot) => (
                  <CircleMarker
                    key={dot.id}
                    center={dot.coordinates}
                    radius={5}
                    fillOpacity={0.8}
                    color={dot.type === 'donation' ? 'green' : 'red'}
                  />
                ))}
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmergencyZones;