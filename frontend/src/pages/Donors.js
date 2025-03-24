import React, { useState } from 'react';
import { Search, MapPin, Gift, ChevronDown } from 'lucide-react';
import DonorImg from './images/donerimages/donor.png';
const DonorCard = ({ donor }) => {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src={donor.profilePic}
            alt={`${donor.name}'s profile`}
            className="rounded-circle me-3"
            style={{ width: '64px', height: '64px', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/path/to/default/image.png'; }}
          />
          <div>
            <h5 className="card-title mb-1">{donor.name}</h5>
            <div className="d-flex align-items-center text-muted">
              <MapPin className="me-1" size={16} />
              <small>{donor.location}</small>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <div className="d-flex align-items-center">
            <Gift className="me-1 text-primary" size={18} />
            <span className="fw-medium">{donor.donations} donations</span>
          </div>
          <small className="text-muted">{donor.distance.toFixed(1)} miles away</small>
        </div>

        <button className="btn btn-primary w-100 mt-3">
          Contact Donor
        </button>
      </div>
    </div>
  );
};

const DonorsProfilePage = () => {
const [donors, setDonors] = useState([
    { id: 1, name: "Aarav Sharma", location: "Delhi", donations: 27, profilePic: DonorImg, distance: 5.2 },
    { id: 2, name: "Priya Iyer", location: "Chennai", donations: 14, profilePic: DonorImg, distance: 3.8 },
    { id: 3, name: "Rahul Gupta", location: "Mumbai", donations: 35, profilePic: DonorImg, distance: 7.1 },
    { id: 4, name: "Ananya Reddy", location: "Hyderabad", donations: 22, profilePic: DonorImg, distance: 4.5 },
    { id: 5, name: "Vikram Patil", location: "Pune", donations: 19, profilePic: DonorImg, distance: 6.3 },
    { id: 6, name: "Kavya Menon", location: "Kochi", donations: 41, profilePic: DonorImg, distance: 2.9 },
    { id: 7, name: "Arjun Nair", location: "Bangalore", donations: 10, profilePic: DonorImg, distance: 8.0 },
    { id: 8, name: "Meera Choudhary", location: "Jaipur", donations: 29, profilePic: DonorImg, distance: 5.7 },
    { id: 9, name: "Devansh Mishra", location: "Lucknow", donations: 31, profilePic: DonorImg, distance: 4.1 },
    { id: 10, name: "Sanya Verma", location: "Bhopal", donations: 25, profilePic: DonorImg, distance: 6.8 },
    { id: 11, name: "Rohan Singh", location: "Patna", donations: 18, profilePic: DonorImg, distance: 7.4 },
    { id: 12, name: "Pooja Deshmukh", location: "Nagpur", donations: 12, profilePic: DonorImg, distance: 3.2 },
    { id: 13, name: "Aditya Bose", location: "Kolkata", donations: 44, profilePic: DonorImg, distance: 5.9 },
    { id: 14, name: "Neha Pillai", location: "Thiruvananthapuram", donations: 37, profilePic: DonorImg, distance: 4.8 },
    { id: 15, name: "Siddharth Rao", location: "Visakhapatnam", donations: 20, profilePic: DonorImg, distance: 6.1 },
    { id: 16, name: "Ishita Kapoor", location: "Chandigarh", donations: 23, profilePic: DonorImg, distance: 7.6 },
    { id: 17, name: "Kunal Das", location: "Guwahati", donations: 16, profilePic: DonorImg, distance: 5.4 },
    { id: 18, name: "Anushka Banerjee", location: "Siliguri", donations: 21, profilePic: DonorImg, distance: 3.7 },
    { id: 19, name: "Tarun Malhotra", location: "Ludhiana", donations: 32, profilePic: DonorImg, distance: 4.3 },
    { id: 20, name: "Shruti Joshi", location: "Dehradun", donations: 28, profilePic: DonorImg, distance: 6.5 }
]);

  const [sortBy, setSortBy] = useState("donations");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("desc");
    }
  };

  const sortedDonors = [...donors]
    .filter(donor =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const factor = sortOrder === "asc" ? 1 : -1;
      if (sortBy === "donations") {
        return (a.donations - b.donations) * factor;
      } else if (sortBy === "distance") {
        return (a.distance - b.distance) * factor;
      } else {
        return 0;
      }
    });

  return (
    <div className="container py-5">
      <h1 className="mb-4 fw-bold">Nearby Donors</h1>

      {/* Search and filter section */}
      <div className="row mb-4 g-3">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <Search size={18} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search donors or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search donors or locations"
            />
          </div>
        </div>

        <div className="col-md-4 d-flex gap-2">
          <button
            className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
            onClick={() => handleSort("donations")}
            aria-label="Sort by donations"
          >
            <span className="me-1">Sort by:</span>
            <span className="fw-medium">
              {sortBy === "donations" ? `Donations (${sortOrder === "asc" ? "Lowest" : "Highest"})` : "Donations"}
            </span>
            <ChevronDown className="ms-1" size={16} />
          </button>

          <button
            className="btn btn-outline-secondary flex-grow-1 d-flex align-items-center justify-content-center"
            onClick={() => handleSort("distance")}
            aria-label="Sort by distance"
          >
            <span className="fw-medium">
              {sortBy === "distance" ? `Distance (${sortOrder === "asc" ? "Nearest" : "Farthest"})` : "Distance"}
            </span>
            <ChevronDown className="ms-1" size={16} />
          </button>
        </div>
      </div>

      {/* Donors grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {sortedDonors.map(donor => (
          <div key={donor.id} className="col">
            <DonorCard donor={donor} />
          </div>
        ))}
      </div>

      {sortedDonors.length === 0 && (
        <div className="text-center py-5">
          <p className="text-muted">No donors found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DonorsProfilePage;