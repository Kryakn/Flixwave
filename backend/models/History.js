const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  posterPath: String,
  backdropPath: String,
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  },
  watchedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Index for faster queries
historySchema.index({ userId: 1, watchedAt: -1 });

module.exports = mongoose.model('History', historySchema);
