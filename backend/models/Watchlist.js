const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
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
  overview: String,
  releaseDate: String,
  voteAverage: Number,
  mediaType: {
    type: String,
    enum: ['movie', 'tv'],
    default: 'movie'
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicates
watchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
