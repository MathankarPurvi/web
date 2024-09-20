const mongoose = require('mongoose');
require('dotenv').config(); // to load environment variables from .env file

// MongoDB connection string from .env
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/User-authentication';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
