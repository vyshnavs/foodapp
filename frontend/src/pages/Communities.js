import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, People, PersonAdd } from 'react-bootstrap-icons';

const FoodDonationCommunitiesPage = () => {
  // Dummy data for food donation communities
  const [communities, setCommunities] = useState([
    { id: 1, name: 'Food for All', members: 1200, description: 'Fighting hunger one meal at a time.' },
    { id: 2, name: 'Share a Meal', members: 800, description: 'Connecting donors with those in need.' },
    { id: 3, name: 'Hunger Heroes', members: 1500, description: 'Volunteers dedicated to ending hunger.' },
    { id: 4, name: 'Feed the Future', members: 900, description: 'Providing meals to underprivileged children.' },
    { id: 5, name: 'Community Kitchen', members: 2000, description: 'Cooking and distributing meals to the homeless.' },
    { id: 6, name: 'Food Rescue Network', members: 1800, description: 'Rescuing surplus food to feed the hungry.' },
    { id: 7, name: 'Meals on Wheels', members: 1300, description: 'Delivering meals to the elderly and homebound.' },
    { id: 8, name: 'No One Hungry', members: 2500, description: 'Ensuring no one goes to bed hungry.' },
    { id: 9, name: 'Food Bank Volunteers', members: 1100, description: 'Supporting local food banks.' },
    { id: 10, name: 'Harvest Hope', members: 1700, description: 'Growing and sharing fresh produce.' },
    { id: 11, name: 'Food Angels', members: 1400, description: 'Providing emergency food assistance.' },
    { id: 12, name: 'Serving Smiles', members: 1600, description: 'Spreading joy through food donations.' },
    { id: 13, name: 'Nourish Communities', members: 1900, description: 'Empowering communities with food security.' },
    { id: 14, name: 'Food for Thought', members: 1000, description: 'Educating and feeding the hungry.' },
    { id: 15, name: 'Plateful of Love', members: 1200, description: 'Sharing meals with those in need.' },
    { id: 16, name: 'Food for Souls', members: 900, description: 'Feeding the body and soul.' },
    { id: 17, name: 'The Giving Table', members: 800, description: 'Bringing people together through food.' },
    { id: 18, name: 'Food for Change', members: 1500, description: 'Using food to drive social change.' },
    { id: 19, name: 'Bread of Life', members: 2000, description: 'Providing bread and essentials to the needy.' },
    { id: 20, name: 'Food for Tomorrow', members: 1800, description: 'Building a hunger-free future.' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter communities based on search query
  const filteredCommunities = communities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle join button click
  const handleJoinCommunity = (id) => {
    alert(`You joined the community: ${communities.find(c => c.id === id).name}`);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h3 className="card-title mb-0">
                <People className="me-2" />
                Food Donation Communities
              </h3>
            </div>
            <div className="card-body">
              {/* Search Section */}
              <div className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Find a food donation community..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-success" type="button">
                    <Search />
                  </button>
                </div>
              </div>

              {/* Community List */}
              <div className="list-group">
                {filteredCommunities.map((community) => (
                  <div key={community.id} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="mb-1">{community.name}</h5>
                        <p className="mb-1 text-muted">{community.description}</p>
                        <small className="text-muted">
                          <People className="me-1" />
                          {community.members} members
                        </small>
                      </div>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleJoinCommunity(community.id)}
                      >
                        <PersonAdd className="me-1" />
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDonationCommunitiesPage;