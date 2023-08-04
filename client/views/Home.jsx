import React, { useState } from 'react';
import '../styles.scss';
import Navbar from '../components/Navbar';
import CreatorFeed from '../containers/CreatorFeed';
import Feed from '../containers/Feed';
import Footer from '../components/Footer';


const Home = ({ userData, isAuthenticated, setIsAuthenticated }) => {
  const [videoList, setVideoList] = useState([]);

  const getFeed = () => {
    fetch('/api/allVideos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((videoData) => videoData.json())
      .then((videoData) => {
        setVideoList(videoData);
      })
      .catch((err) => {
        console.log(`Home failed to GET all videos: ERROR: ${err}`);
      })
    ;
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="bg-dark-subtle">
        {isAuthenticated
          ? <CreatorFeed isAuthenticated={isAuthenticated} getFeed={getFeed} userData={ userData } />
          : null
        }
        <Feed videoList={videoList} setVideoList={setVideoList} getFeed={getFeed} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
