const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/qapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const branchRoutes = require('./routes/branchRoutes');
const queueRoutes = require('./routes/queueRoutes');

app.use('/api', authRoutes);
app.use('/api', branchRoutes);
app.use('/api', queueRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('QApp Backend Running');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});