const mongoose = require('mongoose');

const shortUrlSchema = mongoose.Schema({
  siteId: String,
  shortName: String,
});

const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);