const express = require("express");
const { loginUser } = require("../controllers/user-controller");
const userLoginRoutes = express.Router();

userLoginRoutes.post('/login', loginUser)

module.exports = userLoginRoutes;