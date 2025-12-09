const mongoose = require('mongoose');

const QueueTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: String, required: true },
  serviceType: { type: String, required: true },
  timeSlot: { type: Date, required: true },
  status: { type: String, enum: ['waiting', 'in_progress', 'served', 'cancelled'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QueueTicket', QueueTicketSchema);
