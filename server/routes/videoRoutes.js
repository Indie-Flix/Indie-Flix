// const app = express();
const express = require('express');
const creatorController = require('../controllers/CreatorController');
const videoController = require('../controllers/VideoController');

// VIDEO ROUTE HANDLERS
module.exports = function (app) {
  // GET request for fetching the uploaded videos and info for a particular username
  app.get('/api/videos', videoController.getCreatorUploads, (req, res) => {
    return res.status(200).json(res.locals.creatorUpVideos);
  });

  // POST request to upload new video and poster image
  app.post('/api/videos', creatorController.getLoggedInCreator, videoController.createVideo, (req, res) => {
    return res.status(201).json(res.locals.newVideoContent);
  });
  
  // GET request for ALL videos to be sent to front end
  app.get('/api/allVideos', videoController.allVideos, (req, res) =>
    res.status(200).json(res.locals.videos)
  );

  // GET request for the selected video associated with a video ID
  app.get('/api/videos/:id', videoController.videoById, (req, res) =>
    res.status(200).json(res.locals.videoById)
  );

  // PATCH request to edit video upload contents
  // THIS NEEDS CREATORCONTROLLER because you can only edit your own videos
  // authentication of editing videos will be stretch
  app.patch('/api/videos/:id', videoController.editVideoContent, (req, res) => {
    return res.status(201).json(res.locals.newVideoContent);
  });

  // DELETE request to remove video and contents from site
  // THIS NEEDS CREATORCONTROLLER because users can only remove their own videos
  app.delete('/api/videos/:id', videoController.deleteVideo, (req, res) => {
    return res.status(204).send('Video has been deleted.');
  });

  // GET request for fetching the uploaded videos and info for a particular username
  // THIS NEEDS CREATORCONTROLLER because it needs username
  // Confusion regarding the method, will ignore
  // app.get('api/videos/:username', (req, res) => {
  //   return res.status(200).json(res.locals.userVideos);
  // });
};
