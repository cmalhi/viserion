const User = require('../models/user');

exports.addOne = function(req, res) {
  const { userId } = req.body;
  // console.log('post to signup', req.body, userId);
  User.findOrCreate({ userId })
    .then((newUser) => {
      res.status(200).send(`New User with ID ${newUser.userId} saved`);
    })
    .catch((err) => {
      res.status(400).send(err.errmsg);
    });
};

exports.updatePreferences = function(req, res) {
  const userId = req.params.userid;
  const update = { preferences: req.body }
  User.findOneAndUpdate(userId, update, { new:true })
    .exec()
    .then((user) => {
      res.status(200).send(`User ${user.userId} updated`);
    })
    .catch((err) => {
      res.status(400).send(err.err.msg);
    });
};

