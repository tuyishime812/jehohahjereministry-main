const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Database configuration
const dbConfig = {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/jehovahjire'
};

// JWT configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'fallback_secret_key_for_development',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d'
};

// Email configuration
const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  from: process.env.EMAIL_FROM || 'noreply@jehovahjireministry.org'
};

// Server configuration
const serverConfig = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development'
};

module.exports = {
  dbConfig,
  jwtConfig,
  emailConfig,
  serverConfig
};