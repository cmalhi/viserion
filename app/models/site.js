const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  userId: String,
  html: String,
  screenshot: String,
  settings: {
    components: [String],
    colors: [String],
    text: {
      title: String,
    },
  },
});

const Site = mongoose.model('Site', siteSchema);

module.exports = Site;
