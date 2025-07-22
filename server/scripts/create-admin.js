const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create new admin
    const admin = new Admin({
      name: 'Administrator',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin'
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);
    
    // Save admin to database
    await admin.save();
    
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
};

createAdmin();