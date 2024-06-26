const Joi = require('joi');
const connection = require('../utils/mysqlConnection');

// Joi schema for validating user creation/update input
const userSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  id: Joi.number().integer().min(1).required() // Assuming user ID is a positive integer
});

// Controller methods for handling user-related logic

// Get all users from the database
exports.getAllUsers = (req, res) => {
  connection.query('SELECT * FROM USER', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};

// Create a new user
exports.createUser = (req, res) => {
  // Validate the input data
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, age, id } = req.body; // Adjust according to your USER table schema

  const query = 'INSERT INTO USER (name, age, id) VALUES (?, ?, ?)';
  const values = [name, age, id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'User created successfully', userId: results.insertId });
  });
};

// Update an existing user
exports.updateUser = (req, res) => {
  const { id } = req.params; // Get the user ID from the URL parameters
  const { name, age } = req.body; // Get the updated user details from the request body

  // Validate the input data
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const query = 'UPDATE USER SET name = ?, age = ? WHERE id = ?';
  const values = [name, age, id];
  
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params; // Get the user ID from the URL parameters

  const query = 'DELETE FROM USER WHERE id = ?';
  const values = [id];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  });
};
