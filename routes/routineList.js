const express = require('express')
const router = express.Router();

const ensuAuth = require("../middleware/authenticated")
const routineListController = require('../controllers/routineList')

router.post("/new-routine", [ensuAuth.ensureAuth], routineListController.createList)
router.get("/", routineListController.getAllRoutinesList)



module.exports = router