const express = require('express');
const db = require('../../config/database');
const router = express.Router();
const Page = require('../models/page');
const User = require('../models/user');

router.post('/preferences', function(req, res) {
  var newUser = new User({ preferences: req.body });
  newUser.save(function(err) {
    if (err) return console.err('Err saving user: ', err);
    res.status(200).send('Posted!')
  });
});

module.exports = router;