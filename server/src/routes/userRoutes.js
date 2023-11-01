const express = require("express");
const { createUser, deleteUser, updateUserInfo, getAllUsers, getTasksByRole } = require("../controllers/user-controller");
const userRoutes = express.Router();

userRoutes.post('/createUser', createUser)
userRoutes.get('/users/:role', getTasksByRole)
userRoutes.delete('/', deleteUser)
userRoutes.patch('/update-users', updateUserInfo)
userRoutes.get('/all-users', getAllUsers)
module.exports = userRoutes;