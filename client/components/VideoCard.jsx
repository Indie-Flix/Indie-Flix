import React, { useState, useEffect } from 'react';
import '../styles.scss';
import { Link } from 'react-router-dom';
import EditForm from './EditForm';

const VideoCard = ({ film, fetchVideos, getFeed }) => {
  const { _id, title, image, } = film;
  return (
    <div className='col' key={_id}>
      <div className='card shadow-sm'>
        <div className='card-header text-start border-0'>
          <img src={image} className='bd-placeholder-img' width='100%' height='225' role='img' aria-label='Placeholder: Thumbnail' preserveAspectRatio='xMidYMid slice'/>
          <div className='card-body'>
            <p className='card-text'>
              <strong>{title}</strong>
            </p>
            <div className='d-flex justify-content-between align-items-center'>
              <div className='btn-group'>
                <Link type='button' className='btn btn-sm btn-outline-secondary' to={`/videos/${_id}`}>
                  View
                </Link>
                <button type='button' className='btn btn-sm btn-outline-secondary edit-btn' data-bs-toggle='modal' data-bs-target={`#edit-modal-${film._id}`} >
                  Edit
                </button>
                <EditForm id={_id} getFeed={getFeed} fetchVideos={fetchVideos} data={film}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;