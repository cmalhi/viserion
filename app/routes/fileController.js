const File = require('../models/file');

exports.retrieveOne = function(req, res) {
  const name = req.params.filename;
  File.findOne( { name }, 'body', function(err, file) {
    if (err) return res.status(500).send({ success: false, error: 'Error retrieving file' });
    if (!file || !file['body']) { return res.status(500).send({success: false, error: 'Error retrieving file'})}
    res.send(file['body']);
  })
};