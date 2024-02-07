// const express = require('express')
// const mysql = require('mysql2')

// const PORT = process.env.PORT || 3000;

// const app = express()
// const todoRoutes = require('./todos/routes')

// app.use(express.json())


// //DB Conexión

// const connection = mysql.createConnection({
//     host: 'database-1.clwsswkcoma6.eu-north-1.rds.amazonaws.com',
//     port: '3306',
//     user: 'admin',
//     password: 'bubbo123',
//     database: 'todoDB',
// })

// connection.connect(err => {
//     if (err) {
//         console.error('Error al establecer conexión a la Base de Datos', err.message)
//     } else {
//         console.log('Conexión exitosa a la BD')
//     }
// })

// app.use((request, response, next) => {
//     request.db = connection;
//     next();
//   });

// app.use('/', todoRoutes)


// app.listen(PORT, ()=> {
//     console.log(`Node API running on port ${PORT}`)
// })