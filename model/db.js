const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'workout-tracker',
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return; 
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;