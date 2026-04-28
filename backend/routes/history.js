const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const History = require('../models/History');

// @route   GET /api/history
// @desc    Get user's watch history
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    
    const history = await History.find({ userId: req.userId })
      .sort({ watchedAt: -1 })
      .limit(limit);
    
    res.json({ history, count: history.length });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Error fetching history' });
  }
});

// @route   POST /api/history
// @desc    Add movie/show to watch history
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { movieId, title, posterPath, backdropPath, mediaType, progress } = req.body;

    // Update if exists, create if not
    const historyItem = await History.findOneAndUpdate(
      { userId: req.userId, movieId },
      {
        userId: req.userId,
        movieId,
        title,
        posterPath,
        backdropPath,
        mediaType,
        progress: progress || 0,
        watchedAt: new Date()
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: 'Added to watch history',
      item: historyItem
    });
  } catch (error) {
    console.error('History add error:', error);
    res.status(500).json({ error: 'Error adding to history' });
  }
});

// @route   DELETE /api/history/:movieId
// @desc    Remove movie/show from history
// @access  Private
router.delete('/:movieId', authMiddleware, async (req, res) => {
  try {
    const { movieId } = req.params;

    const result = await History.findOneAndDelete({
      userId: req.userId,
      movieId: parseInt(movieId)
    });

    if (!result) {
      return res.status(404).json({ error: 'Item not found in history' });
    }

    res.json({ message: 'Removed from history' });
  } catch (error) {
    console.error('History remove error:', error);
    res.status(500).json({ error: 'Error removing from history' });
  }
});

// @route   DELETE /api/history
// @desc    Clear all watch history
// @access  Private
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await History.deleteMany({ userId: req.userId });
    res.json({ message: 'Watch history cleared' });
  } catch (error) {
    console.error('History clear error:', error);
    res.status(500).json({ error: 'Error clearing history' });
  }
});

module.exports = router;
