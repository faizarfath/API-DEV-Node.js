const connection = require('../utils/mysqlConnection');

// Model method for retrieving all users
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM USER';
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Model method for creating a new user
exports.createUser = (name, age, id) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO USER (name, age, id) VALUES (?, ?, ?)';
    const values = [name, age, id];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId); // Return the ID of the newly created user
      }
    });
  });
};

// Model method for updating an existing user
exports.updateUser = (id, name, age) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE USER SET name = ?, age = ? WHERE id = ?';
    const values = [name, age, id];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0); // Return true if user was updated, false otherwise
      }
    });
  });
};

// Model method for deleting a user
exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM USER WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.affectedRows > 0); // Return true if user was deleted, false otherwise
      }
    });
  });
};
