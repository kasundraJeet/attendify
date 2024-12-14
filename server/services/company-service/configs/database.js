const { db_url } = require('./index');
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = db_url;
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.error('Error connecting to MongoDB', e);
    process.exit(1);
  }
};

module.exports = connectDB;
