const fs = require('node:fs');

const token = () => {
    try {
        return fs.readFileSync('token.txt', 'utf8')
    }
    catch (err) {
        return null
    }
}

const mysql_password = () => {
    try {
        return fs.readFileSync('password.txt', 'utf8')
    }
    catch (err) {
        return null
    }
}

const api_keygen = () => {
    try {
        return fs.readFileSync('key.txt', 'utf8')
    }
    catch (err) {
        return null
    }
}

module.exports = {token, mysql_password, api_keygen};
