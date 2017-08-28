const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  password: String,
  email: String,
  name: String,
  // preferences: { keywords: [String], colors: [String], title: String },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
