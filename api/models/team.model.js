var mongoose = require("mongoose");

var Team = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String
  }
}, {
  collection: "team"
});

module.exports = mongoose.model("Team", Team);