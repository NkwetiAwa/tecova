const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stations = new Schema({
  userid: { type: String },
  type: { type: Number, default: 0 },                        // 0 => Manhole, 1 => BTS
  active: { type: Boolean, default: true },
  position: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  lastMile: { type: Boolean, default: true },
  numberOfSleeves: { type: Number },
  comment: { type: String },
  center: { type: String },
  name: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Stations', Stations);