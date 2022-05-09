const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('ParkingLot', parkingLotSchema);
