const mongoose = require('mongoose');
const User = require('./models/User');
const { dbConfig } = require('./config/config');

async function setupDefaultAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbConfig.uri);
    console.log('✓ MongoDB connection successful');

    // Check if admin user exists
    let adminUser = await User.findOne({ username: 'admin' });

    if (!adminUser) {
      // Create default admin user with the specific password
      adminUser = new User({
        username: 'admin',
        password: 'jehovah123', // This will be hashed automatically by the pre-save hook
        role: 'admin'
      });

      await adminUser.save();
      console.log('✓ Default admin user created (username: admin, password: jehovah123)');
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\nBackend setup is complete!');
    console.log('To start the server, run: npm run dev');
    console.log('\nAPI Endpoints:');
    console.log('- POST /api/auth/login - User login');
    console.log('- POST /api/auth/register - User registration');
    console.log('- GET /api/content/:page - Get content by page');
    console.log('- POST /api/content - Create/update content (requires auth)');
    console.log('- POST /api/contact/submit - Submit contact form');
    console.log('- POST /api/media/upload - Upload media files (requires auth)');
    console.log('- GET /api/admin/dashboard-stats - Admin dashboard stats (requires auth)');
    console.log('\nDefault admin credentials:');
    console.log('- Username: admin');
    console.log('- Password: jehovah123');

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    if (error.message.includes('ECONNREFUSED')) {
      console.log('⚠️  MongoDB is not running locally.');
      console.log('\nTo create the default admin user, please:');
      console.log('1. Start your MongoDB server (locally or Atlas)');
      console.log('2. Run this script again: node setup-test.js');
      console.log('\nDefault admin credentials:');
      console.log('- Username: admin');
      console.log('- Password: jehovah123');
      console.log('\nOr use MongoDB Atlas with your connection string in .env file');
    } else {
      console.error('✗ Error during setup:', error.message);
    }
  }
}

// Run the setup
setupDefaultAdmin();