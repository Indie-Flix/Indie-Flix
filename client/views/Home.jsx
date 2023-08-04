import React, { useState } from 'react';
import '../styles.scss';
import Navbar from '../components/Navbar';
import CreatorFeed from '../containers/CreatorFeed';
import Feed from '../containers/Feed';
import Footer from '../components/Footer';
import VideoCard from '../components/VideoCard';


const Home = ({ userData, isAuthenticated, setIsAuthenticated }) => {
  const [videoList, setVideoList] = useState([]);
  const [studioName, setStudioName] = useState('');
  const [outputArray, setOutputArray] = useState([]);

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
        console.log(`Network response error: STATUS: ${response.status}`);
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
      console.log(`CreatorFeed failed to GET all videos: ERROR: ${err}`);
    }
  };

  return (
    <>
      <Navbar fetchVideos={fetchVideos} getFeed={getFeed} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="bg-dark-subtle">
        {isAuthenticated
          ? <CreatorFeed studioName={studioName} setStudioName={setStudioName} outputArray={outputArray} setOutputArray={setOutputArray} isAuthenticated={isAuthenticated} getFeed={getFeed} fetchVideos={fetchVideos} userData={ userData } />
          : null
        }
        <Feed videoList={videoList} setVideoList={setVideoList} getFeed={getFeed} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
