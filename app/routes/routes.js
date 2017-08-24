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
router.get('/files/:filename', fileController.retrieveOne);


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

  // Read in template file
  fse.copy(root + '/app/pages/templates/simple', root + '/app/pages/user-pages/01')
    .then(() => {
      // Write new 'hero' to header.css
      const cssFile = root + '/app/pages/user-pages/01/css/header.css';
      fs.appendFileAsync(cssFile, heros[0])
        .then(() => {
        })
        .catch((err) => console.error(err));
    })
    .catch(err => console.error(err));


  // Generate new custom templates
    // Replace the template with 'skyblue'
    // Replace the template with 'powderblue'
    // Replace the template with 'green'
    // Replace the template with 'olive'

});

module.exports = router;