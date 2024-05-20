import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AksShop from './pages/AksShop';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aksShop" element={<AksShop />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;