var mongoose = require('mongoose');
mongoose.connect('mongodb://sweezed:mlab1968@ds141410.mlab.com:41410/project1db');
//mongoose.connect('mongodb://localhost/viserion');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});
