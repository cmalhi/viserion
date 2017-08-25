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
const File = require('../models/file');
const UserTemplate = require('../models/userTemplate');
const userTemplateController = require('./userTemplateController');

/*
 * /GET /:filename
 */
router.get('/files/:filename', fileController.retrieveOne);

/*
 *  Returns an array of template IDs URLs ['usertemplates/:id', ...] from userID
 */
router.get('/usertemplates/list', userTemplateController.retrieveTemplates);

/*
 * /GET /:templateid
 */
router.get('/usertemplates/:id', userTemplateController.retrieveOne);

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

  const fileNames = ['head.html', 'style.html', 'hero.html', 'content.html', 'footer.html'];

  // Finds file names in file table and concatenates bodies of each file object
  Promise.all(fileNames.map(file => File.find({name: file}).exec()))
    .then(files => {
      const page = files.reduce((acc, item) => {
        return acc + item[0].body
      }, '');
      const customPage = page.replace('${BG-COLOR}', userPreferences.color).replace('${TITLE}', userPreferences.title);
      const finalPage = beg + customPage + end;

      // TODO: update user id
      UserTemplate.create({body: finalPage, userid: '1'})
        .then(template => {
          console.log(template);
          res.send(finalPage);
        })
        .catch(err => console.log(err));

    });
});

module.exports = router;