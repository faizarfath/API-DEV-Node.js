const connection = require('../utils/mysqlConnection');

// Model method for retrieving user by username
exports.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM LOGIN WHERE username = ?';
    connection.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // Return the first user found or null if not found
      }
    });
  });
};
