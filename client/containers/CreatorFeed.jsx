import React, { useState, useEffect } from 'react';
import '../styles.scss';
import EditForm from '../components/EditForm';
import { Link } from 'react-router-dom';
import VideoCard from '../components/VideoCard';

const CreatorFeed = ({ userData, getFeed, isAuthenticated }) => {
  const [studioName, setStudioName] = useState('');
  const [outputArray, setOutputArray] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        console.log('Network response error.');
      }
      const videoData = await response.json();
      // setVideos(videoData);
      setStudioName(videoData[0].createdBy.studio);
      setOutputArray(videoData.map(film => {
        return (
          <VideoCard key={film._id} film={film} fetchVideos={fetchVideos} getFeed={getFeed}/>
        );
      }));
    } catch (err) {
      console.log(`An error occurred while getting video info: ERROR: ${err.message}.`);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [isAuthenticated]);
  
  // console.log(outputArray);
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