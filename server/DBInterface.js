const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 5, // Maximum number of connections in the pool
  host: 'bnisbzz3bv74es0e8rw2-mysql.services.clever-cloud.com',
  user: 'urtl88wb8e6kmpfz',
  password: 'o4O8YryKkeqDVV4tWEzi',
  database: 'bnisbzz3bv74es0e8rw2',
  port: 3306,
  multipleStatements: true
});



function createEvent(newEvent, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        console.log('Connected to pool');
        console.log(newEvent)


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

    });
}

function addDays(DaysArray, calenderType, eventID, callback) {
    console.log(eventID);
    console.log(DaysArray);

    let queries = "";
    const dataToSend = [];
    DaysArray.map((day) =>{
        queries += "INSERT INTO days SET ?;";
        let dayDate = new Date(Date.parse(day));

        dataToSend.push({
            eventId: eventID,
            date: calenderType==0?dayDate:null,
            weekDay: calenderType==1?day:null
        });
    });


    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        connection.query(queries, dataToSend, (err, results) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error executing query:', err);
                console.warn(err.query);
                callback(err, null);
                
                return;
            }
            callback(null, results);

        });
    });
}
// Define your createEvent function



 // Export the createEvent function
module.exports = {
    createEvent,
    addDays
};