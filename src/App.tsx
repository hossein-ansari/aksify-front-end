import React from 'react';
import logo from './logo.svg';
import './index.css';
import { useRoutes } from 'react-router-dom';
import routes from './Routes/Routes'
function App() {
  const router = useRoutes(routes)
  return (
    <div className="App">
      {router}
    </div>
  );
}

export default App;
