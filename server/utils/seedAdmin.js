require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.env.ADMIN_EMAIL || 'admin@gotvisa.com';
    const password = process.env.ADMIN_PASSWORD || 'changeme123';

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log(`Admin already exists: ${email}`);
    } else {
      await Admin.create({ email, password });
      console.log(`Admin created: ${email}`);
    }

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
