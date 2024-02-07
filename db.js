const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'database-1.clwsswkcoma6.eu-north-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'bubbo123',
    database: 'todoDB',
});

connection.connect(err => {
    if (err) {
        console.error('Error al establecer conexión a la Base de Datos', err.message);
    } else {
        console.log('Conexión exitosa a la BD');
    }
});

module.exports = connection;
