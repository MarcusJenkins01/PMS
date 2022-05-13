const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  space_id: { type: String, required: true },
  start_timestamp: { type: Date, required: true },
  end_timestamp: { type: Date, required: true },
  paid: { type: Boolean, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
