const express = require('express')

let tasks = []

// const createTodo = (request, response) => {
//     response.json({
//         successful: true,
//         data: request.body,
//     })
// }

// const getTodos = (request, response) => {
//     response.json({
//         successful:true,
//         data: [{id: 1, text: 'Welcome to the home page'}],
//     })
// }

// const hello = (request, response) => {
//     response.json({
//         successful: true,
//         data: [{id: 1, text: 'Learn sss'}]
//     })
// }


const createTask = (request, response) => {
    const { title, description, status } = request.body;

    // Verificar campos requeridos
    if (!title || !description || !status) {
        return response.status(400).json({
            successful: false,
            error: 'Faltan campos obligatorios.'
        });
    }

    // Obtener fecha de creación
    const todayDate = new Date();
    const createdAtDate = todayDate.toLocaleDateString('es-ES');
    const createdAtTime = todayDate.toLocaleTimeString('es-ES');

    // Verificar status
    if (status !== 'pendiente' && status !== 'completado' && status !== 'en progreso') {
        return response.status(400).json({
            successful: false,
            error: 'El estado de la tarea debe ser "pendiente", "completado" o "en progreso".',
        });
    }

    // Establecer conexión
    const db = request.db;

    // Insertar datos 
    const sql = 'INSERT INTO tasks(title, description, status, createdAt) VALUES (?, ?, ?, ?)';
    const values = [title, description, status, `${createdAtDate} at ${createdAtTime}`];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error al insertar la tarea en la base de datos:', err.message);
            return response.status(500).json({
                successful: false,
                error: 'Error al insertar la tarea en la base de datos.',
                details: err 
            });
        }

        const insertedTaskId = results.insertId;

        // Obtener la tarea  insertada desde la bd
        db.query('SELECT * FROM tasks WHERE id = ?', [insertedTaskId], (selectErr, selectResults) => {
            if (selectErr) {
                console.error('Error al obtener la tarea recién insertada:', selectErr.message);
                return response.status(500).json({
                    successful: false,
                    error: 'Error al obtener la tarea recién insertada de la base de datos.',
                    details: selectErr
                });
            }

            const newTask = selectResults[0];

            response.json({
                successful: true,
                message: 'Nueva tarea creada exitosamente',
                data: newTask
            });
        });
    });
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