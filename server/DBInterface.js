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

function addDays(daysArray, calenderType, eventID, callback) {
    let queries = "";
    const dataToSend = [];
    daysArray.map((day) => {
        queries += "INSERT INTO days SET ?;";
        let dayDate = new Date(Date.parse(day));

        dataToSend.push({
            eventId: eventID,
            date: calenderType == 0 ? dayDate : null,
            weekDay: calenderType == 1 ? day : null
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

function deleteEventById(id, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        const query = 'DELETE FROM events WHERE id = ?;';

        connection.query(query, id, (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }

            callback(null, result);
        });

    });
}

function getEventById(id, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        //THIS IS THE SQL SELECT STATEMENT IM USING 

        // SELECT 
        //     events.*,
        //     JSON_ARRAYAGG(days.id) AS ids,
        //     JSON_ARRAYAGG(days.date) AS dates,
        //     JSON_ARRAYAGG(days.weekDay) AS weekDays
        // FROM 
        //     events
        // JOIN 
        //     days ON events.id = days.eventId
        // WHERE 
        //     events.id = 6
        // GROUP BY 
        //     events.id;	

        const query = 'SELECT events.*, JSON_ARRAYAGG(days.id) AS ids, JSON_ARRAYAGG(days.date) AS dates, JSON_ARRAYAGG(days.weekDay) AS weekDays FROM events JOIN days ON events.id = days.eventId WHERE events.id = ? GROUP BY events.id;';

        connection.query(query, id, (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }

            callback(null, result);
        });

    });
}

function getTimesById(id, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            return;
        }

        const query = "SELECT t.* FROM times t JOIN days d ON t.dayId = d.id JOIN events e ON d.eventId = e.id WHERE e.id = ?;";
        connection.query(query, id, (err, result) => {
            connection.release(); // Release the connection back to the pool

            if (err) {
                console.error('Error executing query:', err);
                callback(err, null);
                return;
            }

            callback(null, result);
        });
    });
}




// Export the createEvent function
module.exports = {
    createEvent,
    addDays,
    deleteEventById,
    getEventById,
    getTimesById
};