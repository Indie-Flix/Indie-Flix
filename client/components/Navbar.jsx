import React, { useEffect } from 'react';
import '../styles.scss';
import UploadForm from './UploadForm';
import LogoutButton from './Logout'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Navbar = ({ isAuthenticated, setIsAuthenticated, fetchVideos, getFeed }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch('/api/creators/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false); 
      navigate('/'); 
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  
  useEffect(() => {}, [isAuthenticated]);


  return (
    <header>
      <div className="navbar navbar-expand navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a href="/" className="navbar-brand d-flex align-items-center red-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-film"
              viewBox="0 0 16 16"
              style={{ marginRight: '10px' }}
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
            </svg>
            <strong style={{ fontSize: '28px' }}>Indie-Flix</strong>
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                type="button"
                className="nav-link custom-white-text"
                data-bs-toggle="modal"
                data-bs-target="#upload-modal"
              >
                Upload
              </a>
              <UploadForm getFeed={getFeed} fetchVideos={fetchVideos} />
            </li>
            {isAuthenticated ? 
              <li className="nav-item">
                <button className="nav-link" onClick={() =>  handleLogout() }>
                  Logout
                </button>
              </li>
              : 
              <li className="nav-item">
                <Link type="button" className="nav-link" to={'/login'}>
                  Login/Register
                </Link>
              </li>
            }
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

