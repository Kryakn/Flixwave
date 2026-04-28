const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, avatar, preferences } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (avatar) updateFields.avatar = avatar;
    if (preferences) updateFields.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', authMiddleware, async (req, res) => {
  try {
    const { genres, language } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          'preferences.genres': genres,
          'preferences.language': language
        }
      },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Preferences updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Error updating preferences' });
  }
});

module.exports = router;
