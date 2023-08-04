const Video = require('../models/videoModel');
const jwt = require('jsonwebtoken');

const videoController = {
  // Creates new video in database - POST request to '/api/videos'
  createVideo: async (req, res, next) => {
    try {

      // Sanitize information in request body
      const { title, description, image, credits, videoLink, genre } = req.body;
      // Create new video in database from sanitized request body
      const newVideoObject = new Video({ title, description, image, credits, videoLink, genre, });

      // Decode JWT token
      const decodedJWT = jwt.decode(req.cookies.usertoken, {
        complete: true,
      });

      // Assign createdBy property to new video as ID from decoded JWT token
      newVideoObject.createdBy = decodedJWT.payload.id;

      // Save new video to database and attach to res.locals to return to frontend
      const newVideo = await newVideoObject.save();
      res.locals.newVideoContent = newVideo;

      return next();
    }
    catch (err) {
      return next({
        log: `videoController.createVideo failed to create new video, ${err.message}.`,
        status: 500,
        message: { err: 'Failed to create new video.' },
      });
    }
  },

  // Get all videos from signed in creator - GET from '/api/videos/:id'
  getCreatorUploads: async (req, res, next) => {
    try {
      // Decode JWT token
      const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
      // Save videos from returned from database query for all videos associated with ID from decoded JWT token
      const creatorUpVideos = await Video.find({ createdBy: decodedJWT.payload.id }).populate({ path: 'createdBy', select: '_id studio ' });
      // Attach to res.locals to return to frontend
      res.locals.creatorUpVideos = creatorUpVideos;

      return next();
    } catch (err) {
      return next({
        log: `videoController failed to find videos for logged in creator: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to get logged in creator.' },
      });
    }
  },

  // Get all videos in reverse chronological order - GET from '/api/allVideos'
  allVideos: async (req, res, next) => {
    try {
      // Save videos returned from database query for all videos in reverse chronological order (newest to oldest)
      const allVideos = await Video.find().sort({ createdAt: -1 });
      // Attach to res.locals to return to frontend
      res.locals.videos = allVideos;

      return next();
    }
    catch (err) {
      return next({
        log: `VideoController.allVideos failed to find all videos: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to get all videos.' },
      });
    }
  },

  // VIDEOBYID METHOD
  videoById: async (req, res, next) => {
    try {
      // sanitize route parameter 'id' from the req.params object
      const { id } = req.params;
      // declare singleVideo constant assign it the video associated with the passed in route parameter
      const singleVideo = await Video.findById(id);
      res.locals.videoById = singleVideo;

      return next();
    }
    catch (err) {
      return next({
        log: `VideoController.videoById failed to find videos by ID: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to get logged in creator.' },
      });
    }
  },

  // Edit video content for specific fields - PATCH from '/api/videos/:id'
  editVideoContent: async (req, res, next) => {
    try {
      // Sanitize ID from request params
      const { id } = req.params;
      // Sanitize information in request body
      const { title, description, thumbnail: image, videoUrl: videoLink, credits, genre } = req.body;

      // Create new update variable with required fields from request body
      const updates = {};
      if (title) updates.title = title;
      if (description) updates.description = description;
      if (image) updates.image = image;
      if (videoLink) updates.videoLink = videoLink;
      if (credits) updates.credits = credits;
      if (genre) updates.genre = genre;

      // Find video by ID and update contents with sanitized update object
      const updatedVideo = await Video.findByIdAndUpdate(id, updates, { new: true });
      // Attach to res.locals to send to frontend
      res.locals.newVideoContent = updatedVideo;

      return next();
    }
    catch (err) {
      return next({
        log: `VideoController.editVideoContent failed to edit video for ID: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to edit video content.' },
      });
    }
  },

  // DELETEVIDEOCONTENT METHOD
  deleteVideo: async (req, res, next) => {
    try {
      // Sanitize route parameter id from request params
      const { id } = req.params;
      // find video associated with the route parameter, delete it from the Video model, and assign it to the variable deletedVideo
      const deletedVideo = await Video.findOneAndDelete({ _id: id });

      // if no video was deleted and stored into the deletedVideo variable, return an error
      if (!deletedVideo) {
        return next({
          log: 'VideoController.deleteVideo failed to delete video.',
          status: 500,
          message: { err: 'Failed to delete video.' },
        });
      }

      return next();
    }
    catch (err) {
      return next({
        log: `VideoController.deleteVideo failed to delete video: ERROR: ${err.message}.`,
        status: 500,
        message: { err: 'Failed to delete video.' },
      });
    }
  },
  //GET VIDEOS BY GENRE
  videoByGenre: async (req, res, next) => {
    try {
      //santaize route paramter id from request params
      const { genre } = req.params;
      //find videos with find passing in the genre
      const result = await Video.find({ genre });
      res.locals.videos = result;
      return next();
    }
    catch (err) {
      return next({
        log: 'Could not find vidoes by genre',
        status: 500,
        message: { err: `Genres not found. There may be an issue with the find invocation: ${err}` },
      });
    }
  }
};

module.exports = videoController;
