const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  body: String,
  keywords: [String],
});

module.exports = mongoose.model('File', fileSchema);