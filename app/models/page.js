const mongoose = require('mongoose');

const pageSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  fileLocation: String,
  keywords: [String],
});

module.exports = mongoose.model('Page', pageSchema);