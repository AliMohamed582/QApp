const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');

router.post('/branches', async (req, res) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/branches', async (req, res) => {
  const branches = await Branch.find();
  res.json(branches);
});

router.get('/branches/:id/prediction', async (req, res) => {
  const branch = await Branch.findById(req.params.id);
  if (!branch) return res.status(404).json({ error: 'Branch not found' });
  res.json({ predictedLoad: branch.predictedLoad || {} });
});

router.put('/branches/:id', async (req, res) => {
  const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(branch);
});

router.delete('/branches/:id', async (req, res) => {
  await Branch.findByIdAndDelete(req.params.id);
  res.json({ message: 'Branch deleted' });
});

module.exports = router;
