const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const userController = require('../controllers/user');
const user = require("../models/user");

router.post("/signup", userController.register)
router.get("/", userController.getAllUsers)
router.delete("/delete/:userId", userController.deleteUser)

module.exports = router

