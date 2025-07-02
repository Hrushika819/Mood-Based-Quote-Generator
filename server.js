require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/quotes', quoteRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
