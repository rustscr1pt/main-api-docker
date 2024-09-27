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

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connected to mysql db.')
    }
    else {
        console.log(`Connection to the db failed.\n${err}`)
    }
})

module.exports = mysqlConnection;