const express = require("express");
const router = express.Router();
const ensuAuth = require("../middleware/authenticated")
const userController = require('../controllers/user');

router.post("/signup", userController.register)
router.post("/login", userController.login)
router.get("/", userController.getAllUsers)
router.get("/:userId", userController.getById)
router.patch("/activate", [ensuAuth.ensureAuth], userController.activateAccount)
router.delete("/delete/:userId", [ensuAuth.ensureAuth], userController.deleteUser)
router.patch("/update/:userId", [ensuAuth.ensureAuth], userController.updateUser)
router.post("/forgotpass/:identification", userController.forgotPassword)

module.exports = router

