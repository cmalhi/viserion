const UserTemplate = require('../models/userTemplate');

exports.retrieveOne = function(req, res) {
  const fileId = req.params.id;
  UserTemplate.findOne( { _id: fileId }, 'body', function(err, file) {
    if (err || !file) return res.status(500).send({ success: false, error: 'Error retrieving template with id ' + req.params.id });
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
    })
    .catch(err => res.status(500).send({ success: false, error: 'Error retrieving template URLs ' + err}));
};

exports.retrieve = function(req, res) {
  return UserTemplate.find({})
    .exec()
    .then(usertemplates => res.send(usertemplates))
    .catch(err => res.status(500).send({ success: false, error: 'Error retrieving all templates ' + err}));
};

exports.upsert = function(query, updated) {
  return UserTemplate.findOneAndUpdate(
    query,
    updated,
    { upsert: true, new: true })
    .exec(function(err, template){ if (err) console.log('err', err); })
    .then(result => result)
    .catch(err => console.log(err))
};
