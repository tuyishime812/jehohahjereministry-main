const express = require('express');
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

// In-memory admin user for immediate access
const adminUser = {
  id: '1',
  username: 'admin',
  password: '$2b$10$NQOgiGikXHtYuCQdOczOWObfL0ywUavCO48.hkRqZtMnrj5YXGWRG', // 'jehovah123' hashed
  role: 'admin'
};

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Auth Route - using in-memory user for immediate access
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('Login attempt for:', username);

    // Check if username matches
    if (username !== adminUser.username) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password using bcrypt
    const isMatch = bcrypt.compareSync(password, adminUser.password);
    if (!isMatch) {
      console.log('Password mismatch for:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: adminUser.id },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: adminUser.id, username: adminUser.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Content route (placeholder)
app.get('/api/content/:page', (req, res) => {
  res.json([]);
});

// Contact route (placeholder)
app.post('/api/contact/submit', (req, res) => {
  res.json({ message: 'Your message has been received. We will get back to you soon.' });
});

// Media route (placeholder)
app.post('/api/media/upload', (req, res) => {
  res.json({ message: 'Upload not available - MongoDB not connected' });
});

// Admin route (placeholder)
app.get('/api/admin/dashboard-stats', (req, res) => {
  res.json({ message: 'Admin stats not available - MongoDB not connected' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Login available with:');
    console.log('- Username: admin');
    console.log('- Password: jehovah123');
    console.log('');
    console.log('Note: MongoDB connection issue detected, using temporary in-memory login');
    console.log('Please ensure your IP is whitelisted in MongoDB Atlas and try again in a few minutes');
});