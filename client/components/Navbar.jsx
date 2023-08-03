import React from 'react';
import '../styles.scss';
import UploadForm from './UploadForm';
import Register from './Register';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="navbar navbar-expand navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a href="/" className="navbar-brand d-flex align-items-center">
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
            <strong>Indie-Flix</strong>
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                type="button"
                className="nav-link"
                data-bs-toggle="modal"
                data-bs-target="#upload-modal"
              >
                Upload
              </a>
              <UploadForm />
            </li>

            <li className="nav-item">
              <Link type="button" className="nav-link" to={'/login'}>
                Login/Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
