const Site = require('../models/site');
const User = require('../models/user');

exports.addOne = function(req, res) {
  console.log('req.body', req.body)
  const { userId, html, preferences } = req.body;
  console.log('req.body', req.body)
  // TODO: configure screenshots
  const newSite = { userId, html, preferences };
  console.log('New site to post', newSite);
  Site.create(newSite)
    .then((site) => {
      console.log(site);
      const siteId = site._id;
      const update = { $push: { 'savedSites': siteId } }
      User.findOneAndUpdate(userId, update, { new: true })
        .then(user => res.send(`User ${user.userId} saved site ${siteId}`));
    })
    .catch(error => res.send(`Error saving new site: ${error}`));
};

exports.retrieveUserAll = function(req, res) {
  const userId = req.params.userid;
  Site.find({userId})
    .exec()
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
  const { preferences } = req.body;
  Site.findOneAndUpdate( {_id: siteId }, { 'preferences' : preferences }, function(err, site) {
    if (err || !site) return res.status(500).send({ success: false, error: 'Error updating site with id ' + req.params.siteid });
    res.send(site);
  })
}

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
