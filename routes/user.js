const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const userController = require('../controllers/user');

router.post("/signup", userController.register)
router.post("/login", userController.login)
router.get("/", userController.getAllUsers)
router.get("/:userId", userController.getById)
router.delete("/delete/:userId", userController.deleteUser)

module.exports = router

