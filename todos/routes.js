const express = require('express')
const { createTask, getTasks, getTask, editTask, deleteTask } = require('./controller')
const router = express.Router()


router.post('/create-task', createTask)

router.get('/tasks', getTasks )

router.get('/task/:id', getTask)

router.put('/task/:id', editTask)

router.delete('/task/:id', deleteTask)


module.exports = router;