const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
});

connection.connect((err) => {
    if (err) {
        console.error('error connecting:', err);
        return;
    }

    console.log('connected to database');
});

///functions

function createEvent(eventData, callback) {
    const query = 'INSERT INTO events SET ?';
  
    connection.query(query, eventData, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
            return;
        }
        callback(null, result.insertId);
    });
}

module.exports = {
    createEvent
};