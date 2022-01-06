const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  data: String,
  contentType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Videos = mongoose.model('Videos', VideosSchema);

module.exports = Videos;
