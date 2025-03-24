import React from 'react';
import { Users, MessageSquare, Calendar, HandHeart } from 'lucide-react';
import foodshareImg from './images/communityimages/foodshare.png';
import foodrescueImg from './images/communityimages/foodrescue.png';
import restaurentImg from './images/communityimages/restaurent.png';
import campusImg from './images/communityimages/campus.png';
const Communities = () => {
  // Sample data
  const communities = [
    {
      id: 1,
      name: 'Food Share',
      members: 254,
      activities: 12,
      image: foodshareImg,
      description: 'Local residents organizing weekly food distributions and community fridges.'
    },
    {
      id: 2,
      name: 'Food Rescue Volunteers',
      members: 142,
      activities: 8,
      image: foodrescueImg,
      description: 'Volunteers who pick up excess food from events and deliver to shelters.'
    },
    {
      id: 3,
      name: 'Restaurant Alliance',
      members: 87,
      activities: 15,
      image:restaurentImg,
      description: 'Local restaurants coordinating donations of prepared meals and ingredients.'
    },
    {
      id: 4,
      name: 'Campus Food Security',
      members: 179,
      activities: 5,
      image: campusImg,
      description: 'University students and staff addressing campus food insecurity.'
    }
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="mb-3">Join Different Communities</h2>
          <p className="lead text-muted">
            Connect with like-minded people making a difference in their local areas.
          </p>
        </div>
        
        <div className="row">
          {communities.map(community => (
            <div key={community.id} className="col-md-6 col-lg-3 mb-4">
              <div className="card h-100 border-0 shadow-sm hover-shadow">
                <img 
                  src={community.image} 
                  className="card-img-top" 
                  alt={community.name}
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{community.name}</h5>
                  <p className="card-text text-muted mb-3">{community.description}</p>
                  
                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <Users size={16} className="text-secondary me-1" />
                      <span className="text-muted">{community.members} members</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <Calendar size={16} className="text-secondary me-1" />
                      <span className="text-muted">{community.activities} activities</span>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-100">Join Community</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row mt-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <MessageSquare size={24} className="text-primary me-2" />
                  <h4 className="mb-0">Discussion Forums</h4>
                </div>
                <p className="text-muted mb-3">
                  Exchange ideas, share success stories, and collaborate on solutions to food insecurity.
                </p>
                <button className="btn btn-outline-primary">Browse Forums</button>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <HandHeart size={24} className="text-primary me-2" />
                  <h4 className="mb-0">Volunteer Opportunities</h4>
                </div>
                <p className="text-muted mb-3">
                  Find local food drives, sorting events, and distribution opportunities near you.
                </p>
                <button className="btn btn-outline-primary">Find Opportunities</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Communities;