const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('QApp Backend Running');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
