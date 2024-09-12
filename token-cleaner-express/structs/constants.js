const fs = require('node:fs');
const mysql_password = () => {
    try {
        return fs.readFileSync('password.txt', 'utf8')
    }
    catch (err) {
        return null
    }
}

module.exports = {mysql_password};
