import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AksShop from './pages/AksShop';
import Login from './pages/Login';
import EditPage from './pages/editPage/EditPage';
import Profile from './pages/Profile'
import Subscription from './pages/Subscription'
import About from './pages/About'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aksShop" element={<AksShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editImage/:id/:changeId?" element={<EditPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;