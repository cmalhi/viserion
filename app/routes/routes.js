const express = require('express');
const db = require('../../config/database');
const router = express.Router();
const Page = require('../models/page');
const User = require('../models/user');
const path = require('path');
const root = path.dirname(require.main.filename);
const Promise = require("bluebird");
const fse = require('fs-extra');
const fs = require('fs');
Promise.promisifyAll(fs);
const async = require('async');
const fileController = require('./fileController');

/*
 * /GET /:filename
 */
router.get('/:filename', fileController.retrieveOne);

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

  // Query Page collections for matching pages
  const pageResults = [ { id: 1, fileLocation: 'simple', keywords: ['standard'] } ];

  // Handle colors
  const colorMapper = { 'blue': ['powderblue', 'steelblue'] };
  const heros = [];
  const allColors = colorMapper[userPreferences['color']];

  allColors.forEach((color) => {
    heros.push(`.hero { background: ${color}; }`)
  });

});

module.exports = router;