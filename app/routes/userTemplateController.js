const UserTemplate = require('../models/userTemplate');

exports.retrieveOne = function(req, res) {
  const fileId = req.params.id;
  UserTemplate.findOne( { _id: fileId }, 'body', function(err, file) {
    if (err) return res.status(500).send({ success: false, error: 'Error retrieving file' });
    res.send(file['body']);
  })
};

exports.retrieveTemplates = function(req, res) {
  // TODO : get user, update user id
  UserTemplate.find({userid: '1'})
    .exec()
    .then(templates => {
      const templateIds = templates.map((template) => 'usertemplates/' + template._id);
      res.send(templateIds);
    });
};