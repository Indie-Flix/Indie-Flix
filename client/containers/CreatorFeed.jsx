import React, { useState, useEffect } from 'react';
import '../styles.scss';
import EditForm from '../components/EditForm';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const CreatorFeed = ({ userData, getFeed, isAuthenticated, fetchVideos, studioName, setStudioName, outputArray, setOutputArray }) => {


  useEffect(() => {
    fetchVideos();
  }, [isAuthenticated]);
  
  //We left off in trying to map the videos to create individual (movie cards) that are tied to the user/creator
  //we want to create an array of react elements with the specific video information for all videos retrieved by the fetch method
  return (
    <>{outputArray.length !== 0 ? (
      <div className="custom-dark-bg" style={{ minHeight: '100vh' }}>
        <section className='py-5 text-center container' style={{ marginTop: '50px' }}>
          <div className='row'>
            <div className='col-md-10 mx-auto'>
              <h1 className='fw-light custom-white-text' id='studio-heading' style={{ fontFamily: 'Oswald, sans-serif', fontSize: '4rem' }}>
                {studioName}&apos;s Published Works
              </h1>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                {outputArray}
              </div>
            </div>
          </div>
        </section>
      </div>
    ) : null}</>
  );
  
  
  

};

export default CreatorFeed;