const ShortUrl = require('../models/shortUrl');
const Site = require('../models/site');
const prefToReactify = require('../utils/prefToReactify');

exports.addOrUpdate = function(req, res) {
  const { siteId, shortName } = req.body;
  console.log('req.body', req.body);

  var newShortUrl = new ShortUrl({ shortName: shortName });
  // if siteId is in shortUrl
  ShortUrl.findOneAndUpdate(
    // update the short name
    { siteId: siteId },
    newShortUrl,
    { upsert: true, new: true },
    function(err, doc) {
      if (err) {
        // handle err
        if (err.code === 11000) {
          res.send({ success: false, status: 'duplicate' });
        } else {
          res.send({ success: false, message: err });
        }
      } else {
        // handle doc
        res.send({ success: true, doc: doc });
      }
    }
  );
};

exports.retrieveShortName = function(req, res) {
  const siteId = req.params.siteid.split(':')[1];
  ShortUrl.findOne({ siteId: siteId })
    .exec()
    .then((shorturl) => {
      const shortName = shorturl.shortName;
      res.send(shortName);
    })
    .catch(err => res.status(500).send({ success: false, error: 'Error getting short name: ' + err}));
};

exports.serveOne = function(req, res) {
  const shortName = req.params.shortname;
  ShortUrl.findOne( { shortName: shortName } )
    .exec()
    .then((shorturl) => {
      const siteId = shorturl.siteId;
      Site.findOne( {_id: siteId} )
        .exec()
        .then(site => {
          const html = prefToReactify(site.preferences);
          res.send(html);
        })
    })
    .catch(err => res.status(500).send({ success: false, error: 'Error rendering site ' + err}));
};