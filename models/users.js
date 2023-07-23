const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  id: { type: String },
  matricle: { type: String },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);