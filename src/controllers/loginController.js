const bcrypt = require('bcrypt');
const connection = require('../utils/mysqlConnection');
const { comparePasswords } = require('../utils/bcryptUtil');

// Controller method for handling user login
exports.loginUser = (req, res) => {
  const { username, password } = req.body;

  // Validate the input data
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Query the database to retrieve the user's hashed password
  const query = 'SELECT * FROM LOGIN WHERE username = ?';
  const values = [username];

  connection.query(query, values, async (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // If no user found with the provided username
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const user = results[0];
    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Password is correct, user is authenticated
    res.status(200).json({ message: 'Login successful', userId: user.id });
  });
};
