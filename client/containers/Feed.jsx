import React from 'react';
import '../styles.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Feed = ({ getFeed, videoList }) => {


  useEffect(() => {
    getFeed();
  }, []);

  const videoArray = videoList.map((video, index) => {
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
          <div className="card-body">
            <p className="card-text">{video.title}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group">
                <Link type="button" className="btn btn-sm btn-outline-secondary" to={`/videos/${video._id}`}>
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="album py-5 bg-dark">
      <div className="container">
        <div className="p-3 text-center text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 mb-4">
          <span className="text fs-1">Latest Uploaded Films</span>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {videoArray}
        </div>
        <div className="d-flex justify-content-between my-3">
          <button className="btn btn-outline-secondary">
            Previous
          </button>
          <button className="btn btn-outline-secondary">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Feed;