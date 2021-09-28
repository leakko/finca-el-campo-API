const User = require("../models/User.model");

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser.id)
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((error) => {
      if(error.code === 11000) {
        res.json({"errorMessage": "El email ya está en uso, elige otro"})
      } else {
        res.json({"errorMessage": error.errors.password ? error.errors.password.properties.message : error.errors.email.properties.message})
      }
  });
};