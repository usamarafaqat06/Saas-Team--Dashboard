const express = require("express");
const { signUpAdmin, loginAdmin } = require("../controllers/admin-controller");
const adminRoutes = express.Router();

adminRoutes.post('/admins', signUpAdmin)
adminRoutes.post('/loginAdmin', loginAdmin)

module.exports = adminRoutes;