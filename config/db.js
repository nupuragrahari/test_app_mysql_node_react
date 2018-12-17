const mysql = require('mysql');
const fs = require('fs');

// First you need to create a connection to the db
var connection = mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "nodeuser@1234",
    database: "newdb"
});

connection.connect((error) => {
    if (error) {
        console.error(error);
    } else {
console.log("connected");
    }
});

module.exports = connection;