const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  space_id: { type: String, required: true },
  start_timestamp: { type: Date, required: true },
  end_timestamp: { type: Date, required: true },
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Booking', bookingSchema);
