import React, { useState } from 'react';
import './styles.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './views/Home';
import LogReg from './views/LogReg';
import Theater from './views/Theater';

const App = () => {
  const location = useLocation();
  const userData = location.state;
  const [creator, setCreator] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <div>
      <Routes>
        <Route element={<Theater />} path="/videos/:id" />
        <Route element={<Home isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userData={userData} />} path="/" />
        <Route element={<LogReg isAuthenticated={isAuthenticated} setCreator={setCreator} setIsAuthenticated={setIsAuthenticated} />} path="/login" creator={creator} setCreator={setCreator} />
      </Routes>
    </div>
  );
  
};

export default App;
