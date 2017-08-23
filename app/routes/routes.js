const express = require('express');
const db = require('../../config/database');
const router = express.Router();
const Page = require('../models/page');
const User = require('../models/user');

/*
 * /POST /preferences
 * Receives a JSON of type { layout: [], color: [], title: '' }
 */
router.post('/preferences', function(req, res) {
  var newUser = new User({ preferences: req.body });
  newUser.save(function(err) {
    if (err) return console.err('Err saving user: ', err);
    res.status(200).send('Posted!')
  });
});

/*
 * /POST /generate
 * Queries current user preferences and generates a file based on that
 */
router.post('/generate', function(req, res) {
  // Get user preferences
  const userPreferences = { layout: ['standard'], color: ['blue', 'green'], title: "Chetan's Milk Shop"};

  // Query Page collections for matching pages
  const pageResults = [ { id: 1, fileLocation: 'simple' } ];

  // Generate a new custom template
    // Replace the template with 'skyblue'
    // Replace the template with 'powderblue'
    // Replace the template with 'green'
    // Replace the template with 'olive'

});

module.exports = router;