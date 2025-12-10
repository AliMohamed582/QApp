const express = require('express');
const router = express.Router();
const QueueTicket = require('../models/QueueTicket');


router.post('/tickets', async (req, res) => {
  try {
    const ticket = new QueueTicket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/tickets', async (req, res) => {
  const tickets = await QueueTicket.find();
  res.json(tickets);
});


router.put('/tickets/:id', async (req, res) => {
  const ticket = await QueueTicket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
});


router.delete('/tickets/:id', async (req, res) => {
  await QueueTicket.findByIdAndDelete(req.params.id);
  res.json({ message: 'Ticket deleted' });
});

module.exports = router;
