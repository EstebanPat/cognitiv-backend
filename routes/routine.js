const express = require('express')
const router = express.Router();

const routineController = require("../controllers/routine")

router.get("/:routineId", routineController.getRoutineById)

module.exports = router