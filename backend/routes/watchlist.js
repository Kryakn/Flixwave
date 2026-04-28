const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Watchlist = require('../models/Watchlist');

// @route   GET /api/watchlist
// @desc    Get user's watchlist
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.userId })
      .sort({ addedAt: -1 });
    
    res.json({ watchlist, count: watchlist.length });
  } catch (error) {
    console.error('Watchlist fetch error:', error);
    res.status(500).json({ error: 'Error fetching watchlist' });
  }
});

// @route   POST /api/watchlist
// @desc    Add movie/show to watchlist
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { movieId, title, posterPath, backdropPath, overview, releaseDate, voteAverage, mediaType } = req.body;

    // Check if already in watchlist
    const existing = await Watchlist.findOne({
      userId: req.userId,
      movieId
    });

    if (existing) {
      return res.status(400).json({ error: 'Already in watchlist' });
    }

    const watchlistItem = new Watchlist({
      userId: req.userId,
      movieId,
      title,
      posterPath,
      backdropPath,
      overview,
      releaseDate,
      voteAverage,
      mediaType
    });

    await watchlistItem.save();

    res.status(201).json({
      message: 'Added to watchlist',
      item: watchlistItem
    });
  } catch (error) {
    console.error('Watchlist add error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Already in watchlist' });
    }
    res.status(500).json({ error: 'Error adding to watchlist' });
  }
});

// @route   DELETE /api/watchlist/:movieId
// @desc    Remove movie/show from watchlist
// @access  Private
router.delete('/:movieId', authMiddleware, async (req, res) => {
  try {
    const { movieId } = req.params;

    const result = await Watchlist.findOneAndDelete({
      userId: req.userId,
      movieId: parseInt(movieId)
    });

    if (!result) {
      return res.status(404).json({ error: 'Item not found in watchlist' });
    }

    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    console.error('Watchlist remove error:', error);
    res.status(500).json({ error: 'Error removing from watchlist' });
  }
});

// @route   GET /api/watchlist/check/:movieId
// @desc    Check if movie is in watchlist
// @access  Private
router.get('/check/:movieId', authMiddleware, async (req, res) => {
  try {
    const { movieId } = req.params;

    const exists = await Watchlist.findOne({
      userId: req.userId,
      movieId: parseInt(movieId)
    });

    res.json({ inWatchlist: !!exists });
  } catch (error) {
    res.status(500).json({ error: 'Error checking watchlist' });
  }
});

module.exports = router;
