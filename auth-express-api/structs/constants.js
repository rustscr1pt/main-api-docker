const fs = require('node:fs');
const mysql_password = () => {
    try {
        const json = JSON.parse(fs.readFileSync('config.json', 'utf8'))
        return json.password
    }
    catch (err) {
        return null
    }
}

module.exports = {mysql_password};
