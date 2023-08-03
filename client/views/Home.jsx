import React, { useState } from 'react';
import '../styles.scss';
import Navbar from '../components/Navbar';
import CreatorFeed from '../containers/CreatorFeed';
import Feed from '../containers/Feed';
import Footer from '../components/Footer';


const Home = ({ userData }) => {
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
        console.log(err);
      })
    ;
  };

  return (
    <>
      <Navbar />
      <main className="bg-dark-subtle">
        <CreatorFeed getFeed={getFeed} userData={ userData } />
        <Feed videoList={videoList} getFeed={getFeed} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
