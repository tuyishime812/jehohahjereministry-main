const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

// Auth Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login attempt for:', username); // Debug

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username); // Debug
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', username); // Debug
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error); // Debug
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check MongoDB connection and create admin if needed
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jehovahjire';

// Updated connection options to handle certificate issues
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
  bufferCommands: false, // Disable mongoose buffering
  bufferMaxEntries: 0, // Disable mongoose buffering
  ssl: true,
  sslValidate: false, // Skip SSL validation (only for development/testing)
  sslCA: null,
  sslCert: null,
  sslKey: null
};

mongoose.connect(MONGODB_URI, connectionOptions)
.then(async () => {
    console.log('MongoDB connected successfully');
    
    // Check if admin user exists, create if not
    const count = await User.countDocuments({ username: 'admin' });
    if (count === 0) {
        const adminUser = new User({
            username: 'admin',
            password: 'jehovah123', // Will be hashed automatically
            role: 'admin'
        });
        await adminUser.save();
        console.log('Default admin user created (username: admin, password: jehovah123)');
    } else {
        console.log('Admin user already exists');
    }
})
.catch(err => {
    console.log('MongoDB connection error:', err.message);
    console.log('Make sure your IP is whitelisted in MongoDB Atlas');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});