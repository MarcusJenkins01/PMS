const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  location: { type: String, required: true },
  start_timestamp: { type: Date, required: true },
  end_timestamp: { type: Date, required: true },
  paid: { type: Boolean, default: false }
});

module.exports = mongoose.model('BookingRequest', bookingSchema);
