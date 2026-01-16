const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  const connectionString = process.env.MONGODB_URI;
  
  if (!connectionString) {
    console.log('ERROR: MONGODB_URI not found in .env file');
    return;
  }
  
  console.log('Testing connection with:', connectionString.replace(/:[^:@]*@/, ':***@'));
  
  const client = new MongoClient(connectionString, {
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    connectTimeoutMS: 10000, // 10 seconds connect timeout
  });

  try {
    await client.connect();
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // Test if we can access the users collection
    const db = client.db();
    const usersCollection = db.collection('users');
    const userCount = await usersCollection.countDocuments();
    console.log(`✅ Found ${userCount} users in the database`);
    
    // Try to find the admin user
    const adminUser = await usersCollection.findOne({ username: 'admin' });
    if (adminUser) {
      console.log('✅ Admin user exists in database');
      console.log('Admin username:', adminUser.username);
    } else {
      console.log('❌ Admin user NOT found in database');
    }
  } catch (error) {
    console.log('❌ CONNECTION FAILED:', error.message);
    if (error.message.includes('authentication')) {
      console.log('This might be due to incorrect username/password in the connection string');
    } else if (error.message.includes('IP')) {
      console.log('Your IP might still not be whitelisted - it can take a few minutes to update');
    }
  } finally {
    await client.close();
  }
}

testConnection();