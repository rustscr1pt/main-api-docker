const mysqlConnection = require('./mysql/init_db');
const {tokenCleaner} = require("./token-cleaner");

console.log("Token cleaner is activated.")
setInterval(() => {
    tokenCleaner(mysqlConnection)
}, 300000)