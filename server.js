const express = require('express')
const PORT = process.env.PORT || 3000;

const app = express()
const todoRoutes = require('./todos/routes')

app.use(express.json())

app.use('/', todoRoutes)


app.listen(PORT, ()=> {
    console.log(`Node API running on port ${PORT}`)
})