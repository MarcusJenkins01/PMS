const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parking_lot_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  is_blocked: { type: Boolean, default: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

module.exports = mongoose.model('ParkingSpace', parkingSpaceSchema);
