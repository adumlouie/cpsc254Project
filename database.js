const mysql = require('mysql2')

module.exports = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'StrawberryMilk140',
    database: '254_Project'
})