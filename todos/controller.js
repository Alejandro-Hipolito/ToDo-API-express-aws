const express = require('express')
const db = require('../db')

let tasks = []


const createTask = async (request, response) => {
    try {
        const { title, description, status } = request.body;

        // Verificar campos requeridos
        if (!title || !description || !status) {
            return response.status(400).json({
                successful: false,
                error: 'Faltan campos obligatorios.'
            });
        }

        // Verificar status
        if (status !== 'pendiente' && status !== 'completado' && status !== 'en progreso') {
            return response.status(400).json({
                successful: false,
                error: 'El estado de la tarea debe ser "pendiente", "completado" o "en progreso".',
            });
        }

        const sql = 'INSERT INTO tasks(title, description, status, createdAt) VALUES (?, ?, ?, ?)';
        const values = [title, description, status, new Date().toISOString()];

        const [results, fields] = await db.promise().query(sql, values);

        const insertedTask = await db.promise().query('SELECT * FROM tasks WHERE id = ?', [results.insertId]);

        response.json({
            successful: true,
            message: 'Nueva tarea creada exitosamente',
            data: insertedTask[0][0]
        });

    } catch (error) {
        console.error('Error:', error.message);
        response.status(500).json({
            successful: false,
            error: 'Error al insertar la tarea en la base de datos.',
            details: error.message
        });
    }
};






const getTasks = (request, response) => {
    response.json({
        successful: true,
        data: tasks
    })
}

const getTask = (request, response) => {
    const taskID = parseInt(request.params.id)
    const taskIdx = tasks.find( taskIdx => taskIdx.id === taskID)

    if(!taskIdx){
        return response.status(404).json({
            successful: false,
            error: `La tarea con el id ${taskID} no existe.`
        })
    }

    response.json({
        successful: true,
        data: taskIdx
    })
}


const editTask = (request, response) => {
    const taskID = parseInt(request.params.id)
    const {title, description, status} = request.body

    //Buscar la tarea
    const taskIdx = tasks.findIndex( taskIdx => taskIdx.id === taskID)

    if(taskIdx === -1){
        return response.status(404).json({
            successful: false,
            error: `La tarea con el id ${taskID} no existe.`
        })
    }


    const updatedTask = {
        ...tasks[taskIdx],
        title: title !== undefined ? title : tasks[taskIdx].title,
        description: description !== undefined ? description : tasks[taskIdx].description,
        status: status !== undefined ? status : tasks[taskIdx].status,
    }

    //Reemplazo
    tasks[taskIdx] = updatedTask

    response.json({
        successful: true,
        newData: updatedTask
    })


}


const deleteTask = (request, response) => {
    const taskID = parseInt(request.params.id)
    const taskIdx = tasks.findIndex( taskIdx => taskIdx.id === taskID)

    if(taskIdx === -1) {
        return response.status(404).json({
            successful: false,
            error: `La tarea con el id ${taskID} no existe.`
        })
    }

    const deletingTask = tasks.splice(taskIdx, 1)[0]

    response.json({
        successful: true,
        data: deletingTask,
        message: `La tarea con el id ${taskID} ha sido eliminada.`
    })


}



module.exports = {
    // createTodo,
    // getTodos,
    // hello,
    createTask,
    getTasks,
    getTask,
    editTask,
    deleteTask
}