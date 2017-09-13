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

  return router;
};

module.exports = routerInstance;


