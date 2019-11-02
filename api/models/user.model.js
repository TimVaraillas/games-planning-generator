var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  saltSecret: String
});

// Events
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.genSalt(10, function (err, salt) {
    console.log(user);
    bcrypt.hash(user.password, salt, function (err, hash) {
      console.log(user.password, hash, salt);
      user.password = hash;
      user.saltSecret = salt;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function verifyPassword(hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
}

userSchema.methods.generateJwt = function () {
  return jwt.sign(
    {  _id: this._id },
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXP }
  );
}

module.exports = mongoose.model("User", userSchema);