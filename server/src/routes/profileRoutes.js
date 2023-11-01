const express = require("express");
const { getAdminInfo } = require("../controllers/profile-controller");
const adminProfileRoutes = express.Router();

adminProfileRoutes.get('/admin', getAdminInfo)

module.exports = adminProfileRoutes;