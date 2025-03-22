import React from 'react';

const AdvertisementSection = () => {
  // Sample ad data
  const advertisements = [
    {
      id: 1,
      title: 'Support Food Waste Reduction',
      image: '/api/placeholder/800/200',
      sponsor: 'Green Earth Initiative',
      link: '#'
    },
    {
      id: 2,
      title: 'Join Our Zero Hunger Campaign',
      image: '/api/placeholder/800/200',
      sponsor: 'United Against Hunger',
      link: '#'
    }
  ];
  
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h4 className="text-center mb-4 text-muted">Sponsored Initiatives</h4>
        
        <div className="row">
          {advertisements.map(ad => (
            <div key={ad.id} className="col-md-6 mb-4">
              <div className="card border-0 shadow-sm overflow-hidden">
                <img 
                  src={ad.image} 
                  className="card-img-top" 
                  alt={ad.title}
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body p-3">
                  <h5 className="card-title mb-1">{ad.title}</h5>
                  <p className="text-muted small mb-2">Sponsored by {ad.sponsor}</p>
                  <a href={ad.link} className="btn btn-sm btn-outline-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-2">
          <small className="text-muted">
            Advertisements help sustain our platform. <a href="#">Learn about our ad policy</a>
          </small>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;