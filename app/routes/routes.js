const express = require('express');
const db = require('../../config/database');
const router = express.Router();
const Page = require('./models/page');
const User = require('./models/user');

router.post('/preferences', function(req, res) {
  const preferences = req.data;
  console.log('req.data');
  // update db with layout preference
  // var newUser = new User({ preferences: req.data });
  res.send('Posted!')
});

module.exports = router;