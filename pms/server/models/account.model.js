const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Account', accountSchema);
