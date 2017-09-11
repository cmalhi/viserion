const Site = require('../models/site');
const User = require('../models/user');

exports.addOne = function(req, res) {
  const { userId, html, preferences } = req.body;
  // TODO: configure screenshots
  const newSite = { userId, html, preferences };
  Site.create(newSite)
    .then((site) => {
      const siteId = site._id;
      const update = { $push: { 'savedSites': siteId } }
      User.findOneAndUpdate(userId, update, { new: true })
        .then(user => res.send(`User ${user.userId} saved site ${siteId}`));
    })
    .catch(error => res.send(`Error saving new site: ${error}`));
};

exports.retrieveAll = function(req, res) {
  const userId = req.params.userId;
  Site.find({userId})
    .exec()
    .then((sites) => res.send(sites))
    .catch(err => res.status(500).send({ success: false, error: 'Error retrieving sites ' + err}));
};

exports.retrieveOne = function(req, res) {
  const fileId = req.params.id;
  Site.findOne( { _id: fileId }, 'body', function(err, file) {
    if (err || !file) return res.status(500).send({ success: false, error: 'Error retrieving site with id ' + req.params.id });
    res.send(file['body']);
  })
};

exports.retrieve = function(req, res) {
  const userId = req.params.userId;
  Site.find({userid})
    .exec()
    .then(sites => {
      const siteIds = sites.map((template) => 'sites/' + site._id);
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
