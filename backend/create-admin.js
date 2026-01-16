const { MongoClient } = require('mongodb');

async function createAdminUser() {
  // Use your MongoDB connection string from .env
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/jehovahjire';

  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(); // This will use the db name from your connection string
    const collection = db.collection('users');

    // Check if admin user already exists
    const existingUser = await collection.findOne({ username: 'admin' });

    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Create the admin user with the hashed password
    const adminUser = {
      username: 'admin',
      password: '$2b$10$NQOgiGikXHtYuCQdOczOWObfL0ywUavCO48.hkRqZtMnrj5YXGWRG', // Hashed 'jehovah123'
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(adminUser);
    console.log('Admin user created successfully:', result.insertedId);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

createAdminUser();