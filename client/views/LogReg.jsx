import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const LogReg = ({creator, setCreator, setIsAuthenticated }) => {
  return (
    <>
      <Navbar />
      <main className="bg-dark-subtle">
        {/* <div className="album py-5 bg-dark" style={{ minHeight: '100vh' }}> */}
        <div className="d-flex flex-column align-items-center">
          <Login setIsAuthenticated={setIsAuthenticated} />
          <br></br>
          <Register/>
        </div>
        {/* </div> */}
      </main>
      <Footer />
    </>
  );
};

export default LogReg;
