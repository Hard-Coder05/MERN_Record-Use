const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const Videos = require('../models/Videos');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  try {
    res.render('dashboard', {
      user: req.user,
      //  videos: videos
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
