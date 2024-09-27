const mysql = require('mysql2');
const {mysql_password} = require("../structs/constants");

const mysqlConnection = mysql.createPool({
    port: "3306",
    user: "gen_user",
    host: "94.241.169.12",
    database: "default_db",
    password: mysql_password(),
    waitForConnections: true,
    connectionLimit: 10,
    enableKeepAlive : true,
    keepAliveInitialDelay : 300000
});

mysqlConnection.getConnection((err, connection) => {
    if (err) {
        console.log(`Connection to the db failed.\n${err}`);
    }
    else {
        console.log('Connected to MySQL db.');
        connection.release(); // Release the connection back to the pool
    }
})

module.exports = mysqlConnection;