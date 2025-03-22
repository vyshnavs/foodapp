import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './navbars/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Sighnup from './pages/Signup';
const App = () => {
  return (
      // Wrap the entire app inside Router
      <Router>
          <Header/>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Sighnup/>} />
              </Routes>
      </Router>
  );
};


  

export default App;

