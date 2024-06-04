const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',      // or '127.0.0.1'
  user: 'root',           // your MySQL username
  password: 'mysql',      // your MySQL password
  database: 'PROJECT'     // the name of your database
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);
});

module.exports = connection;
