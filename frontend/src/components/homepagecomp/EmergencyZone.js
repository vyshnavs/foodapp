import React, { useState } from 'react';
import { AlertTriangle, List, Map } from 'lucide-react';

const EmergencyZones = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  
  // Sample data
  const emergencyZones = [
    { id: 1, name: 'South District Community', severity: 'high', cases: 120, lastDonation: '2 days ago' },
    { id: 2, name: 'East River Neighborhood', severity: 'critical', cases: 180, lastDonation: '3 days ago' },
    { id: 3, name: 'North Hills Area', severity: 'medium', cases: 75, lastDonation: '1 day ago' },
    { id: 4, name: 'West End District', severity: 'high', cases: 105, lastDonation: '4 days ago' }
  ];
  
  const getSeverityClass = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-danger';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-info';
      default: return 'bg-success';
    }
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
            {emergencyZones.map(zone => (
              <div key={zone.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className={`card-header ${getSeverityClass(zone.severity)} text-white`}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-bold">{zone.name}</span>
                      <span className="badge bg-white text-dark">
                        {zone.severity.charAt(0).toUpperCase() + zone.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text mb-1">
                      <strong>Food Insecurity Cases:</strong> {zone.cases}
                    </p>
                    <p className="card-text mb-3">
                      <strong>Last Donation:</strong> {zone.lastDonation}
                    </p>
                    <button className="btn btn-danger w-100">Donate Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="position-relative" style={{ height: '400px' }}>
                <img 
                  src="/api/placeholder/1200/400" 
                  alt="Emergency zones heatmap" 
                  className="w-100 h-100 object-cover"
                  style={{ objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 left-0 p-3 bg-white m-3 rounded shadow">
                  <h6 className="mb-2">Emergency Zones Heatmap</h6>
                  <div className="d-flex align-items-center mb-1">
                    <div className="bg-danger rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                    <small>Critical Zones</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <div className="bg-warning rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                    <small>High Need Zones</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="bg-info rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                    <small>Medium Need Zones</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmergencyZones;