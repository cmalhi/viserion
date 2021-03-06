const mongoose = require('mongoose');
mongoose.Promise = Promise;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  // UserId authenticated from firebase
  userId: { type: String, unique: true, required: true },
  savedSites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
  password: String,
  email: String,
  name: String,
  preferences: {
    keywords: [String],
    colors: [String],
    title: String },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
