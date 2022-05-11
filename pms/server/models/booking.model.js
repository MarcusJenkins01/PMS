const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  space_id: { type: String, required: true },
  start_timestamp: { type: Date, required: true },
  end_timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
