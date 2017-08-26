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
  const userPreferences = { layout: ['standard'], colors: ['blue', 'green'], title: "Chetan's Milk Shop"};

  const beg = '<!DOCTYPE html><html lang="en">';
  const end = '</body></html>';

  const fileNames = ['head.html', 'style.html', 'hero.html', 'content.html', 'footer.html'];

  // Create templates for each combination or user selected style

  // Replace color and title for each template

  // Finds file names in file table and concatenates bodies of each file object
  var fileComponents = {};
  var query = { keywords: ['basic'] };

  File.find(query).exec()
    .then(files => {
      // console.log('ALL FILES: ',files);
      files.map(file => {
        const section = file.section;
        if (fileComponents[section]) {
          fileComponents[section].push(file);
        } else {
          fileComponents[section] = [file];
        }
        // fileComponents[section] = fileComponents[section] ? fileComponents[section].push(file) : [file]
      })

      // Interate through fileComponenets 
      // Produce combinations of components
      var produceCombinations = (obj) => {
        var keys = Object.keys(obj);
        var combinations = [];
        // console.log(' file obj >>', obj);
        function recur(currCombination, i) {
          // base case
          if (i === keys.length) return combinations.push(currCombination)
          
          // recursive case
          for (var inner = 0; inner < obj[keys[i]].length; inner++) {
            recur(currCombination + obj[keys[i]][inner].body, i+1)
          }
        }
        recur('', 0);
        return combinations;
      }

      const combinations = produceCombinations(fileComponents);
      // let customPages = [];
      // Replace with user preferences
        // Handle colors
        // Insert title
      async.each(combinations, function(combination) {
        userPreferences.colors.forEach((color) => {
          let page = combination.replace('${BG-COLOR}', color).replace('${TITLE}', userPreferences.title);
          console.log('newPage', page);
          page = beg + page + end;
          // customPages.push(beg + page + end);
          // Store combinations in DB
          UserTemplate.create({body: page, userid: '1'})
            .then(template => {
              console.log(template);
            })
            .catch(err => console.log(err));
        })
        // console.log('customPages', customPages)
        // cb();
        res.send('User pages generated');
      })
      

      // combinations.forEach((combination) => { 
        
      // })

      

      



    });

      // const page = files.reduce((acc, item) => {
      //   return acc + item[0].body
      // }, '');

      // TODO: update user id


});

module.exports = router;