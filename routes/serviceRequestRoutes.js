const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/ServiceRequest');

router.post('/service-requests', async (req, res) => {
  try {
    const request = new ServiceRequest(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/service-requests', async (req, res) => {
  const items = await ServiceRequest.find();
  res.json(items);
});

router.put('/service-requests/:id', async (req, res) => {
  const item = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

router.delete('/service-requests/:id', async (req, res) => {
  await ServiceRequest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service request deleted' });
});

module.exports = router;
