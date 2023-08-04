const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Name required.'],
    },
    description: {
      type: String,
      required: [true, 'Description required.'],
    },
    image: {
      type: String,
      required: [true, 'Image required.'],
    },
    credits: {
      type: String,
      required: [true, 'Credits required.'],
    },
    videoLink: {
      type: String,
      required: [true, 'Video link required.'],
    },
    // createdBy field references the Creator model (will contain an object with the creator info)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Creator',
    },
  },
  { timestamps: true }
);

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
