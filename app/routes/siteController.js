const Site = require('../models/site');
const User = require('../models/user');

exports.addOne = function(req, res) {
  const { userId, html, components, colors, text } = req.body;
  // TODO: configure screenshots
  const newSite = { userId, html, settings: { components, colors, text } };
  Site.create(newSite)
    .then((site) => {
      const siteId = site._id;
      const update = { $push: { 'savedSites': siteId } }
      User.findOneAndUpdate(userId, update, { new: true })
        .then(user => res.send(`User ${user.userId} saved site ${siteId}`));
    })
    .catch(error => res.send(`Error saving new site: ${error}`));
};
