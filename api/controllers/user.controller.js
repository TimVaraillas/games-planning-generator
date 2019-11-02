var mongoose = require("mongoose");
var passport = require("passport");
var _ = require("lodash");

var User = require("../models/user.model")

module.exports.register = function (req, res, next) {
  var user = new User({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  });
  user.save()
    .then(function (document) {
      res.status(200).json(document);
    }).catch(function (err) {
      res.status(400).json(err);
    });
}

module.exports.authenticate = function(req, res, next) {
  passport.authenticate("local", function (err, user, info) { // call for passport authentication 
    if (err) { // error from passport middleware
      return res.status(400).json(err);
    } else if (user) { // registered user
      return res.status(200).json({ token: user.generateJwt() });
    } else { // unknown user or wrong password
      return res.status(404).json(info);
    }
  })(req, res);
}

module.exports.userProfile = function(req, res, next) {
  User.findOne({ _id: req._id }, function(err, user) {
    if (err) { // error from passport middleware
      return res.status(400).json(err);
    } else if(!user) {
      return res.status(404).json({ status: false, message: "User record not found." });
    } else
      return res.status(200).json({ status: true, user: _.pick(user, ["firstname", "lastname", "email"])
    });
    }
  );
}