const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  password: String,
  email: String,
  name: String,
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
