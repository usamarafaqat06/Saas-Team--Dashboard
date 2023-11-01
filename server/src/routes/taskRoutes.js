
const express = require("express");
const { addTasks, deleteTasks, updateTasks, getAllTasks, getAllTasksByRole, getUserTasks, deleteAllSpecificTasks } = require("../controllers/tasks-controller");
const taskRoutes = express.Router();


taskRoutes.get('/all-tasks', getAllTasks)
taskRoutes.get('/all-tasks/:role', getAllTasksByRole)
taskRoutes.post('/', addTasks)
taskRoutes.delete('/:task_id', deleteTasks)
taskRoutes.patch('/update-task', updateTasks)
taskRoutes.get('/:user_id', getUserTasks)
taskRoutes.delete('/all-tasks/specific-tasks', deleteAllSpecificTasks)

module.exports = taskRoutes;