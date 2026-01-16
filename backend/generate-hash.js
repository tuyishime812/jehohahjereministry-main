const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'jehovah123';
  const saltRounds = 10;
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hash for "jehovah123":', hashedPassword);
  } catch (error) {
    console.error('Error hashing password:', error);
  }
}

hashPassword();