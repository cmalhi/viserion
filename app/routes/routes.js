const express = require('express');
const db = require('../../config/database');
const router = express.Router();
const Page = require('../models/page');
const User = require('../models/user');
const Promise = require("bluebird");
const fse = require('fs-extra');
const fs = require('fs');
Promise.promisifyAll(fs);
const async = require('async');
const fileController = require('./fileController');

/*
 * /GET /:filename
 */
router.get('/files/:filename', fileController.retrieveOne);

/*
 * /POST /preferences
 * Receives a JSON of type { layout: [], color: [], title: '' }
 */
router.post('/preferences', function(req, res) {
  console.log('post to preferences', req.body)
  var newUser = new User({ preferences: req.body });
  newUser.save(function(err, result) {
    if (err) return console.err('Err saving user: ', err);
    res.status(200).send(result)
  });
});

/*
 * /POST /generate
 * Queries current user preferences and generates a file based on that
 */
router.post('/generate', function(req, res) {
  // Get user preferences
  const userPreferences = { layout: ['standard'], color: ['blue'], title: "Chetan's Milk Shop"};

  const beg = '<!DOCTYPE html><html lang="en">';
  const end = '</body></html>';

  // Get head, style, hero, body, footer

  // Replace color in style
  // Replace title in hero

  // Concatenate them
  // Save into User database
  // Send the result

});

module.exports = router;