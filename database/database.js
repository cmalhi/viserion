var mongoose = require('mongoose');
const config = require('../config/config');

mongoose.connect(config.dbUrl, {useMongoClient: true});

var db = mongoose.connection; 

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});