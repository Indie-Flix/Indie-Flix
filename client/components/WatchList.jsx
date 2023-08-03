import React, { useState, useEffect } from 'react';
import '../styles.scss';
import VideoCard from './VideoCard';


const Watchlist = () => {

    // fetch watchlist and create array of videos to watch here
    // 

  return (
    <div className='watchlist-container' >
      <h1 className='watchlist-heading'>Your Watchlist</h1>
      <div className='watchlist-row'>
        <div className='mock-video'>
            Mock Video Card
        </div>
      </div>
    </div>
  )
};

export default Watchlist;