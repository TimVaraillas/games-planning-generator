var mongoose = require("mongoose");

var Tournament = new mongoose.Schema({
  name: {
    type: String
  }
},{
    collection: "tournament"
});

module.exports = mongoose.model("Tournament", Tournament);