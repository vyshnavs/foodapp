import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Person, Envelope, Telephone, GeoAlt, Lock, Bell, Trophy, Heart, People, Truck, CheckCircle, ClipboardCheck, CalendarEvent, ListTask } from 'react-bootstrap-icons';
import profileImg from './images/donerimages/donor.png';
const UserProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [volunteerRequests, setVolunteerRequests] = useState([]);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Fetch user details from localStorage on component mount
  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession'));
    if (userSession) {
      setUserDetails(userSession);
      if (userSession.role === 'volunteer') {
        // Load volunteer-specific data
        loadVolunteerData();
      }
    }
  }, []);

  // Dummy data for volunteer requests, tasks, etc.
  const loadVolunteerData = () => {
    // Dummy volunteer requests
    setVolunteerRequests([
      { id: 1, task: 'Food Distribution at Community Center', date: '2023-10-10', status: 'Pending' },
      { id: 2, task: 'Help at Food Bank Warehouse', date: '2023-10-15', status: 'Pending' },
    ]);

    // Dummy ongoing tasks
    setOngoingTasks([
      { id: 1, task: 'Deliver Food to Shelter', date: '2023-10-05', status: 'In Progress' },
    ]);

    // Dummy upcoming tasks
    setUpcomingTasks([
      { id: 1, task: 'Organize Food Drive', date: '2023-10-20', status: 'Upcoming' },
    ]);

    // Dummy completed tasks
    setCompletedTasks([
      { id: 1, task: 'Assist at Food Distribution Event', date: '2023-09-30', status: 'Completed' },
    ]);
  };

  // Handle accept/reject volunteer request
  const handleVolunteerRequest = (id, action) => {
    setVolunteerRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    );
    if (action === 'accept') {
      setOngoingTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), task: volunteerRequests.find((req) => req.id === id).task, date: new Date().toISOString().split('T')[0], status: 'In Progress' },
      ]);
    }
    alert(`Request ${action === 'accept' ? 'accepted' : 'rejected'}`);
  };

  if (!userDetails) {
    return <div className="text-center mt-5">Loading user details...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="card-title mb-0">User Profile</h3>
            </div>
            <div className="card-body">
              {/* Profile Image */}
              <div className="text-center mb-4">
                <img
                  src={profileImg}// Dummy profile image
                  alt="Profile"
                  className="rounded-circle img-thumbnail"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>

              {/* User Details */}
              <div className="mb-4">
                <h5 className="text-center mb-3">Personal Information</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex align-items-center">
                    <Person className="me-2" />
                    <strong>Name:</strong> {userDetails.name}
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <Envelope className="me-2" />
                    <strong>Email:</strong> {userDetails.email}
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <Telephone className="me-2" />
                    <strong>Phone:</strong> {userDetails.phone}
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <GeoAlt className="me-2" />
                    <strong>Address:</strong> {userDetails.address}
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <Lock className="me-2" />
                    <strong>Password:</strong> ********
                  </li>
                </ul>
              </div>

              {/* Role Badge */}
              <div className="text-center mb-4">
                <h5 className="mb-3">Role</h5>
                <span
                  className={`badge ${
                    userDetails.role === 'donor'
                      ? 'bg-success'
                      : userDetails.role === 'volunteer'
                      ? 'bg-warning'
                      : 'bg-info'
                  } p-2`}
                >
                  {userDetails.role.toUpperCase()}
                </span>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="text-center mb-3">About Me</h5>
                <p className="text-muted text-center">{userDetails.description}</p>
              </div>

              {/* Volunteer-Specific Features */}
              {userDetails.role === 'volunteer' && (
                <>
                  {/* Volunteering Requests */}
                  <div className="mb-4">
                    <h5 className="text-center mb-3">
                      <ClipboardCheck className="me-2" />
                      Volunteering Requests
                    </h5>
                    <ul className="list-group">
                      {volunteerRequests.map((request) => (
                        <li key={request.id} className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{request.task}</strong>
                            <br />
                            <small>{request.date}</small>
                          </div>
                          <div>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => handleVolunteerRequest(request.id, 'accept')}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleVolunteerRequest(request.id, 'reject')}
                            >
                              Reject
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ongoing Tasks */}
                  <div className="mb-4">
                    <h5 className="text-center mb-3">
                      <ListTask className="me-2" />
                      Ongoing Tasks
                    </h5>
                    <ul className="list-group">
                      {ongoingTasks.map((task) => (
                        <li key={task.id} className="list-group-item">
                          <strong>{task.task}</strong>
                          <br />
                          <small>{task.date}</small>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Upcoming Tasks */}
                  <div className="mb-4">
                    <h5 className="text-center mb-3">
                      <CalendarEvent className="me-2" />
                      Upcoming Tasks
                    </h5>
                    <ul className="list-group">
                      {upcomingTasks.map((task) => (
                        <li key={task.id} className="list-group-item">
                          <strong>{task.task}</strong>
                          <br />
                          <small>{task.date}</small>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Completed Tasks */}
                  <div className="mb-4">
                    <h5 className="text-center mb-3">
                      <CheckCircle className="me-2" />
                      Completed Tasks
                    </h5>
                    <ul className="list-group">
                      {completedTasks.map((task) => (
                        <li key={task.id} className="list-group-item">
                          <strong>{task.task}</strong>
                          <br />
                          <small>{task.date}</small>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

            
                          <div className="text-center mb-4">
                            <a href="/donate" className="btn btn-success btn-lg">
                              <Heart className="me-2" />
                              Donate Now
                            </a>
                          </div>

                          {/* Edit Profile Button */}
              <div className="text-center">
                <button className="btn btn-primary">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;