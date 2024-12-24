const express = require("express");
const router = express.Router(); //เรียกออกมาเป็นฟังค์ชัน
const userController = require("../controllers/user.controller");

//http://localhost:5000/api/v1/auth/register
router.post("/register", userController.register);
//http://localhost:5000/api/v1/auth/login
router.post("/login", userController.login);

module.exports = router;
