const express = require("express");
const {
  updateTasks,
  getAllMyTasks,
  taskSeen,
} = require("../controllers/tasks-controller");
const { getUserinfo } = require("../controllers/profile-controller");
const updateUserTasksRoute = express.Router();

updateUserTasksRoute.patch("/update-task", updateTasks);
updateUserTasksRoute.get("/get-all-user-assigned-task", getAllMyTasks);
updateUserTasksRoute.get("/my-profile", getUserinfo);
updateUserTasksRoute.patch("/task-seen", taskSeen);
module.exports = updateUserTasksRoute;
