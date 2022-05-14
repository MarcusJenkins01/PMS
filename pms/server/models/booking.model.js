const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  space_id: { type: mongoose.Types.ObjectId, required: true },
  start_timestamp: { type: Date, required: true },
  end_timestamp: { type: Date, required: true },
  paid: { type: Boolean, required: true },
  arrived: { type: Boolean, default: false },
  arrival_time: { type: Date, default: null },
  departed: { type: Boolean, default: false },
  departure_time: { type: Date, default: null }
});

module.exports = mongoose.model('Booking', bookingSchema);
