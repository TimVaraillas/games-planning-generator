const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Tournament = new Schema({
  name: {
    type: String
  }
},{
    collection: 'tournament'
});

module.exports = mongoose.model('Tournament', Tournament);