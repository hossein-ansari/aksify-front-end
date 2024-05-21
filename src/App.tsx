import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AksShop from './pages/AksShop';
import Login from './pages/Login';
import EditPage from './pages/EditPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aksShop" element={<AksShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editImage/:id" element={<EditPage />} />

      </Routes>
    </Router>
  );
};

export default App;