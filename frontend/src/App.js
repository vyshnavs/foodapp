import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './navbars/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Sighnup from './pages/Signup';
import Volunteeus from './pages/Volunteers';
import TrackService from './pages/TrackService';
import FindFood from './pages/FindFood'; 
import FoodMart from './pages/FoodMart';
import Donors from './pages/Donors';
import Reward from './pages/Reward';
import About from './pages/About';
import UserProfile from './pages/UserProfile';
import FoodDonation from './pages/FoodDonation';
import Communities from './pages/Communities';
const App = () => {
  return (
      // Wrap the entire app inside Router
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Sighnup/>} />
              <Route path="/volunteers" element={<Volunteeus/>} />
              <Route path="/maptrack" element={<TrackService/>} />
              <Route path="/find-food" element={<FindFood/>} />
              <Route path="/foodmart" element={<FoodMart/>} />
              <Route path="/donors" element={<Donors/>} />
              <Route path="/rewards" element={<Reward/>} />
              <Route path="/aboutus" element={<About/>} />
              <Route path="/profile" element={<UserProfile/>} />
              <Route path="/donate" element={<FoodDonation/>} />
              <Route path="/communities" element={<Communities/>} />
              </Routes>
      </Router>
  );
};


  

export default App;

