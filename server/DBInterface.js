const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 5, // Maximum number of connections in the pool
  host: 'bnisbzz3bv74es0e8rw2-mysql.services.clever-cloud.com',
  user: 'urtl88wb8e6kmpfz',
  password: 'o4O8YryKkeqDVV4tWEzi',
  database: 'bnisbzz3bv74es0e8rw2',
  port: 3306
});



function createEvent(newEvent, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        console.log('Connected to pool');



        const query = 'INSERT INTO events SET ?';




        connection.query(query, newEvent, (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
        }

        callback(result.insertId);
        });

    });
}

function addDays(DaysArray, eventID) {
    console.log(eventID);
    console.log(DaysArray);
}
// Define your createEvent function



 // Export the createEvent function
module.exports = {
    createEvent,
    addDays
};