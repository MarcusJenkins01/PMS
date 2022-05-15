const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Open' }
});

module.exports = mongoose.model('Ticket', ticketSchema);
