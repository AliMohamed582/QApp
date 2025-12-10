const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/auth/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Registered', userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ message: 'Logged in', userId: user._id, role: user.role });
});

module.exports = router;
