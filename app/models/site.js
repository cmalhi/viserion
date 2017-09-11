const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userId: String,
  html: String,
  screenshot: String,
  preferences: Object,
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
