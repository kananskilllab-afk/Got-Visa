const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    
    if (!uri) {
      console.error('CRITICAL: MongoDB URI not found in environment variables (MONGODB_URI or MONGO_URI).');
      return;
    }

    console.log('Attempting to connect to MongoDB...');
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`ERROR: MongoDB connection failed: ${error.message}`);
    // Detailed error logging for common issues
    if (error.message.includes('ECONNREFUSED')) {
      console.error('Detailed Error: Connection refused. Check if the database is running or the firewall is blocking access.');
    }
  }
};

module.exports = connectDB;
