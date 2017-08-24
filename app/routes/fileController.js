var File = require('../models/file');

exports.retrieveOne = function(req, res) {
  console.log('fileController');
  const name = req.params.fileName;
  console.log('req.params', req.params);
  File.findOne( { name }, 'body', function(err, file) {
    if (err) return res.status(500).send({ success: false, error: 'Error retrieving file'});
    console.log('file', file);
  })
};