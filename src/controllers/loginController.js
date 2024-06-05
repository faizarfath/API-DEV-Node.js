const loginModel = require('../models/loginModel');
const { comparePasswords } = require('../utils/bcryptUtil');

// Controller method for handling user login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validate the input data
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Retrieve the user from the database by username
    const user = await loginModel.getUserByUsername(username);

    // If no user found with the provided username
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Password is correct, user is authenticated
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Error executing query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller method for retrieving all rows from the LOGIN table
exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await loginModel.getAllUsers();

    // If there are no results, return an empty array
    if (users.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    // Return the results
    res.status(200).json({ users });
  } catch (error) {
    console.error('Error executing query: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
