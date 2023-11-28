const express = require('express')
const router = express.Router();

const routineController = require("../controllers/routine")

router.get("/:routineId", routineController.getRoutineById);
router.patch("/finish/:routineId", routineController.finishRoutine);

module.exports = router