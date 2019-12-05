var mongoose = require("mongoose");

var Game = new mongoose.Schema({
  address: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  championship: {
    type: String
  },
  datetime: {
    type: Date,
    required: true
  },
  color: {
    type: String
  },
  localTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  },
  awayTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team"
  }
}, {
  collection: "game"
});

module.exports = mongoose.model("Game", Game);