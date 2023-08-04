import React from 'react';
import '../styles.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Genre from '../components/Genre';

const Feed = ({ getFeed, videoList, setVideoList }) => {
  
  const getByGenre = async (event) => {
    const { value } = event.target;
    try {
      const result = await fetch(`api/videos/genre/${value}`);
      
      const videos = await result.json();
      setVideoList(videos);
      getVideoArray();
    }
    catch (err) {
      console.log('Cannot fetch genre request', err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  let videoArray;
  const getVideoArray = () => {
    videoArray = videoList.map((video, index) => {
    return (
      <div className="col" key={index}>
        <div className="card shadow-sm">
          <img
            src={video.image}
            className="bd-placeholder-img"
            width="100%"
            height="225"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
          />
          <div className="card-body custom-dark-bg text-center">
            <p className="card-text custom-white-text video-title">{video.title}</p>
            <div className="d-flex justify-content-center align-items-center">
              <div className="btn-group">
                <Link
                  type="button"
                  className="btn btn-sm custom-btn"
                  to={`/videos/${video._id}`}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return videoArray;
}
  return (
    <div className="album py-5 custom-dark-bg">
      <div className="container">
        <div className="p-3 text-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 mb-4 custom-dark-bg border-strong-black">
          <span className="text fs-1 text-white">Latest Uploaded Films</span>
          <div>
            <Genre getByGenre={ getByGenre } />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {videoArray}
        </div>
        <div className="d-flex justify-content-between my-3">
          <button className="btn btn-outline-secondary custom-btn">
            Previous
          </button>
          <button className="btn btn-outline-secondary custom-btn">Next</button>
        </div>
      </div>
    </div>
  );  
};

export default Feed;