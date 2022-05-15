const mongoose = require('mongoose');

const ticketChatSchema = new mongoose.Schema({
  ticket_id: { type: mongoose.Types.ObjectId, required: true },
  message: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

module.exports = mongoose.model('TicketChat', ticketChatSchema);