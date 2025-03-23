
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Static method to create admin from env vars
AdminSchema.statics.createFromEnv = async function() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    
    if (!email || !password) {
      console.error('Admin email and password must be set in the .env file');
      return null;
    }
    
    // Check if admin already exists
    const existingAdmin = await this.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      return existingAdmin;
    }
    
    // Create new admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const admin = new this({
      name: 'Admin',
      email,
      password: hashedPassword,
      role: 'superadmin'
    });
    
    await admin.save();
    console.log('Admin created successfully');
    return admin;
  } catch (err) {
    console.error('Error creating admin:', err);
    return null;
  }
};

module.exports = mongoose.model('admin', AdminSchema);
