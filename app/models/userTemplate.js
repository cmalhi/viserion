const mongoose = require('mongoose');

const userTemplateSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: String,
  body: String,
  userid: String,
  screenshot: String,
  // userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const UserTemplate = mongoose.model('UserTemplate', userTemplateSchema);

module.exports = UserTemplate;
