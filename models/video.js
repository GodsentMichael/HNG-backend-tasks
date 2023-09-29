const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  filename: {
    type: String,
    unique: true,
  },
},
{
    timestamps: true
},

);

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
