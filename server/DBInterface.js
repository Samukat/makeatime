const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 5, // Maximum number of connections in the pool
  host: 'bnisbzz3bv74es0e8rw2-mysql.services.clever-cloud.com',
  user: 'urtl88wb8e6kmpfz',
  password: 'o4O8YryKkeqDVV4tWEzi',
  database: 'bnisbzz3bv74es0e8rw2',
  port: 3306
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database.');

  // Define your createEvent function
  function createEvent(newEvent, callback) {
    const query = 'INSERT INTO events SET ?';
    connection.query(query, newEvent, (err, result) => {
      connection.release(); // Release the connection back to the pool

      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
      callback(null, result.insertId);
    });
  }

  // Export the createEvent function
  module.exports = {
    createEvent
  };
});