const mongoose = require('mongoose');

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });