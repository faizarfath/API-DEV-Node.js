const bcrypt = require('bcrypt');

// Function to hash a password
exports.hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw error;
  }
};

// Function to compare a password with a hash
exports.comparePasswords = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};
