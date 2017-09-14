const express = require('express');
const db = require('../../database/database');
const router = express.Router();
const Promise = require('bluebird');
const fs = require('fs');
Promise.promisifyAll(fs);
// const Screenshot = require('url-to-screenshot');
const User = require('../models/user');
const File = require('../models/file');
const Site = require('../models/site');
const UserTemplate = require('../models/userTemplate');
const fileController = require('./fileController');
const userTemplateController = require('./userTemplateController');
const userController = require('./userController');
const siteController = require('./siteController');

var routerInstance = function(io) {

  /*
   * /POST /signup
   * Adds a new user to mongoDB, using firebase userID
   */

  router.post('/signup', userController.addOne);

  /*
   * /POST /preferences
   * Receives a JSON of shape { layout: [], color: [], title: '' }
   */
  router.post('/preferences/:userid', userController.updatePreferences);

  /*
   * /POST /site
   * Adds selected site to user collection and sites collection
   */

  router.post('/sites', siteController.addOne);
  
  router.get('/sites/list/:userid', siteController.retrieveList);

  router.get('/sites/all', siteController.retrieveAll);
 
  router.get('/sites/all/:userid', siteController.retrieveUserAll);
 
  router.get('/sites/:siteid', siteController.retrieveOne);

  router.put('/sites/:siteid', siteController.updateOne);

  router.get('/:siteid', siteController.serveOne);

    /*
   * /POST /submitchoice
   * Grabs templateID, generates screenshot image, inserts screenshot image into userTemplates
   */
  router.post('/submitchoice', function (req, res) {
    console.log('submitchoice');
    const templateId = "59a19409bc1b89b728fe07cb";

    // new Screenshot('/usertemplates/' + templateId)
    //   .width(1080)
    //   .height(1920)
    //   .clip()
    //   .capture()
    //   .then(img => {
    //     // TODO: Store in S3

    //     const screenshotUrl = __dirname + '/../../js/components/example.png';
    //     fs.writeFileSync(screenshotUrl, img);
    //     console.log(screenshotUrl);

    //     userTemplateController.upsert({_id: templateId}, {screenshot: screenshotUrl})
    //       .then(updatedDoc => console.log('new screenshotUrl: ' + updatedDoc.screenshot));
    //   });
  });


  // Post to render react pages for web swiper views
  // Receives array of preferences with each object
  // Sends them to swiper to render pages


  // Deprecated method for creating user templates
  /*
   * /POST /generate
   * 1) Uses user preferences to pull relevant file components
   * 2) Combines file components to create many different templates
   * 3) Replaces strings in templates with user preferences (e.g. ${BG-COLOR})
   * 4) Stores templates into userTemplates
   */
  // router.post('/generate', function (req, res) {
  //   // Shape of user preferences example:
  //   // const userPreferences = { layouts: ['grid'], colors: ['blue', 'green'], title: "Chetan's Milk Shop", keywords: ['cooking']};

  //   const userPreferences = req.body;
  //   console.log('userPreferences in generate', req.body, userPreferences);

  //   const beg = '<!DOCTYPE html><html lang="en">';
  //   const end = '</body></html>';

  //   // Create templates for each combination or user selected style
  //   // Finds file names in file table and concatenates bodies of each file object
  //   var components = {};
  //   var queryTerms = [{layouts: 'base'}];

  //   userPreferences.layouts.forEach(layout=> {
  //     queryTerms.push({layouts: layout});
  //   });

  //   userPreferences.keywords.forEach(keyword => {
  //     queryTerms.push({keywords: keyword});
  //   });

  //   var query = {$or: queryTerms};
  //   File.find(query).exec()
  //     .then(files => {
  //       files.map(file => {
  //         const section = file.section;
  //         if (components[section]) {
  //           components[section].push(file);
  //         } else {
  //           components[section] = [file];
  //         }
  //         // components[section] = components[section] ? components[section].push(file) : [file]
  //       });

  //       const combinations = produceCombinations(components);
  //       let templatePromises = [];

  //       // Replace with user preferences: replace color and title for each template
  //       combinations.forEach((combination) => {
  //         userPreferences.colors.forEach((color) => {
  //           let page = combination.replace('${BG-COLOR}', color).replace('${TITLE}', userPreferences.title);
  //           page = beg + page + end;

  //           // Store combinations in DB
  //           // TODO: update user id
  //           templatePromises.push(
  //             UserTemplate.create({body: page, userid: '1'})
  //               .then(template => {
  //                 return template;
  //               })
  //               .catch(err => console.log(err))
  //           )
  //         });
  //       });

  //       refreshUserTemplates();

  //       // Resolve promise additions to usertemplates collection
  //       Promise.all(templatePromises)
  //         .then(templates => {
  //           res.send('User pages generated');
  //         })
  //         .catch(err => console.log(err));

  //     });

  // });


  // /*
  //  * Removes user's old templates
  //  */
  // var refreshUserTemplates = () => {
  //   // TODO: add user ID
  //   UserTemplate
  //     .remove({})
  //     .exec()
  //     .then(data => {
  //       return "Old templates successfully deleted";
  //     })
  // };

  // /*
  //  * produceCombinations: Produces combinations of components
  //  * input: { 0: [File({body: 'a'}), File({body: 'b'})],
  //  *          1: [File({body: 'c'})],
  //  *          2: [File({body: 'd'})] }
  //  * output: ['acd', 'bcd']
  //  */
  // var produceCombinations = (obj) => {
  //   var keys = Object.keys(obj);
  //   var combinations = [];

  //   function recur(currCombination, i) {
  //     if (i === keys.length) return combinations.push(currCombination);
  //     for (var inner = 0; inner < obj[keys[i]].length; inner++) {
  //       recur(currCombination + obj[keys[i]][inner].body, i + 1)
  //     }
  //   }

  //   recur('', 0);
  //   return combinations;
  // };

  return router;
};

module.exports = routerInstance;

