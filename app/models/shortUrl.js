const mongoose = require('mongoose');

const shortUrlSchema = mongoose.Schema({
  _id: { unique: false },
  siteId: { type: String, unique: true },
  shortName: { type: String, unique: true },
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

module.exports = ShortUrl;