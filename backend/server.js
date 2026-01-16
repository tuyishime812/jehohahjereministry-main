const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { dbConfig, serverConfig } = require('./config/config');

const app = express();

// Connect to MongoDB
mongoose.connect(dbConfig.uri)
.then(async () => {
  console.log('MongoDB connected');

  // Check if any users exist, if not, create default admin
  const User = require('./models/User');
  const userCount = await User.countDocuments();

  if (userCount === 0) {
    const defaultAdmin = new User({
      username: 'admin',
      password: 'jehovah123', // Will be hashed by pre-save hook
      role: 'admin'
    });

    await defaultAdmin.save();
    console.log('Default admin user created (username: admin, password: jehovah123)');
  }
})
.catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/content', require('./routes/content'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/media', require('./routes/media'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(serverConfig.port, () => {
  console.log(`Server running on port ${serverConfig.port} in ${serverConfig.env} mode`);
});