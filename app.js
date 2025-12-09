const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI missing in .env");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => {
    console.error("❌ Connection Error:", err.message);
    process.exit(1);
  });

// Import and use routes
const userRoutes = require('./routes/userRoutes');
const queueRoutes = require('./routes/queueRoutes');

app.use('/api', userRoutes);
app.use('/api', queueRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('QApp Backend Running');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
