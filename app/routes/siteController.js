const Site = require('../models/site');
const User = require('../models/user');
const prefToReactify = require('../utils/prefToReactify');
const snapshot = require('../utils/snapshot');
const Screenshot = require('url-to-screenshot');
const fs = require('fs');

exports.addOne = function(req, res) {
  const { userId, html, preferences } = req.body;
  // TODO: configure screenshots
  const newSite = { userId, html, preferences };
  Site.create(newSite)
    .then((site) => {
      const siteId = site._id;
      if (userId) {
        const update = { $push: { 'savedSites': siteId } }
        User.findOneAndUpdate(userId, update, { new: true })
          .then(user => res.send(siteId));
      } else {
        res.send(siteId);
      }
    })
    .catch(error => res.send(`Error saving new site: ${error}`));
};

exports.retrieveUserAll = function(req, res) {
  const userId = req.params.userid;
  Site.find({userId})
    .sort({updated: -1})
    .then((sites) => res.send(sites))
    .catch(err => res.status(500).send({ success: false, error: 'Error retrieving sites ' + err}));
};

exports.retrieveAll = function(req, res) {
  Site.find({})
    .exec()
    .then((sites) => res.send(sites))
    .catch(err => res.status(500).send({ success: false, error: 'Error retrieving sites ' + err}));
};

exports.retrieveOne = function(req, res) {
  const siteId = req.params.siteid;
  Site.findOne( { _id: siteId }, function(err, site) {
    if (err || !site) return res.status(500).send({ success: false, error: 'Error retrieving site with id ' + req.params.siteid });
    res.send(site);
  })
};

exports.updateOne = function(req, res) {
  const siteId = req.params.siteid;
  const { preferences, userId } = req.body;
  const html = prefToReactify(preferences);
  let update = {};
  if (preferences) {
    const html = prefToReactify(preferences);
    update['preferences'] = preferences;
    update['html'] = html;

    /* SCREENSHOT MAKER START */
    // var url = `http://spindleapp.com/id/${siteId}`;
    // var url = 'http://spindleapp.com/pages/quo2';
    // new Screenshot(url)
    //   .width(1080)
    //   .height(1920)
    //   .clip()
    //   .capture()
    //   .then(img => {
    //     console.log('img created: ', img);
    //     // test
    //     fs.writeFileSync('./img.png', img);
    //
    //     // Upload to AWS
    //     snapshot.uploadAws(img);
    //
    //     // Put into database
    //     // TODO: Database call that takes in { siteId, imgUrl } and updates DB
    //   })
    //   .catch(err => console.log('Err generating snapshot: ', err));
    /* SCREENSHOT MAKER END*/
  }
  if (userId) {
    update['userId'] = userId;
    const userUpdate = { $push: { 'savedSites': siteId } };
    User.findOneAndUpdate({"userId": userId}, userUpdate, { new: true })
      .then(user => console.log(`${user} updated`));
  }
  // console.log('update to update >>>>>', update, siteId);
  Site.findOneAndUpdate( {_id: siteId }, update, function(err, site) {
    if (err || !site) return res.status(500).send({ success: false, error: 'Error updating site with id ' + req.params.siteid });
    // console.log('user added to a site', site);
    res.send(site);
  })
}

exports.serveOne = function(req, res) {
  const siteId = req.params.siteid;
  Site.findOne( {_id:siteId } )
    .exec()
    .then(site => {
      const html = prefToReactify(site.preferences);
      res.send(html);
    })
    .catch(err => res.status(500).send({ success: false, error: 'Error rendering site ' + err}));
};

exports.retrieveList = function(req, res) {
  const userId = req.params.userid;
  Site.find({userId})
    .exec()
    .then(sites => {
      const siteIds = sites.map((site) => 'sites/' + site._id);
      res.send(siteIds);
    })
    .catch(err => res.status(500).send({ success: false, error: 'Error retrieving site URLs ' + err}));
};

exports.upsert = function(query, updated) {
  return Site.findOneAndUpdate(
    query,
    updated,
    { upsert: true, new: true })
    .exec(function(err, site){ if (err) console.log('err', err); })
    .then(result => result)
    .catch(err => console.log(err))
};
