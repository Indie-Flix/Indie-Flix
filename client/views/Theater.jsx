import React, { useState, useEffect } from 'react';
import '../styles.scss';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';

const Theater = () => {
  //need a fetch to get info from the video collection based on the id params
  //useParams
  const [video, setVideo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/videos/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((videoData) => videoData.json())
      .then((videoData) => {
        setVideo(videoData);
        console.log('successfully retrieved one video');
        console.log(videoData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="custom-dark-bg">
        <div className="album py-5 custom-dark-bg">
          <div className="container custom-dark-bg"> 
            <div className="p-3 text-center text-primary-emphasis custom-dark-bg rounded-3 mb-4 custom-box">
              {/* <div
                className="spinner-border text-primary mx-3"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div> */}
              <span className="text custom-white-text" style={{ fontSize: '4rem' }}>{video.title}</span> 
              {/* <div
                className="spinner-border text-primary mx-3"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div> */}
            </div>
  
            <div className="row row-cols-1 row-cols-sm-8 row-cols-md-12 g-3">
              <div className="col">
                <div className="card shadow-sm" style={{ height: '662px' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.videoLink}
                    title="Relaxing Music For Stress Relief - Axolotls - 3 HOURS of Calming Meditation Study Sleep Music"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
  
                  <title>Placeholder</title>
  
                  <div className="card-body">
                    <p className="card-text custom-white-text">{video.description}</p> 
                    <div className="d-flex justify-content-end">
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
  
}; 

export default Theater;
