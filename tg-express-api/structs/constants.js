const fs = require('node:fs');

function readConfig(propertyName) {
    try {
        const result = JSON.parse(fs.readFileSync('config.json', 'utf8'));
        return result[propertyName]
    }
    catch (err) {
        return null
    }
}

const token = () => {
    try {
        return readConfig('token')
    }
    catch (err) {
        return null
    }
}

const mysql_password = () => {
    try {
        return readConfig('password')
    }
    catch (err) {
        return null
    }
}

const api_keygen = () => {
    try {
        return readConfig('key')
    }
    catch (err) {
        return null
    }
}

module.exports = {token, mysql_password, api_keygen};
