import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await fetch('/api/logout', {
  //       method: 'POST',
  //       credentials: 'include',
  //     });
  //     setIsAuthenticated(false); 
  //     navigate('/'); 
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };

  return (
    <button className="nav-link" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
