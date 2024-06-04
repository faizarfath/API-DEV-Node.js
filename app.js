// const bcrypt = require('bcrypt');
// const connection = require('./mysqlConnection');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // You can use bodyParser instead of express.json() and express.urlencoded()

const app = express();
const port = 3000;

// Middleware to serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const loginRoutes = require('./src/routes/loginRoutes');

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error ending the connection:', err.stack);
      return;
    }
    console.log('Connection closed');
    process.exit();
  });
});