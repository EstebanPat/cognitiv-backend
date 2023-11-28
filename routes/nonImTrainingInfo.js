const express = require('express')
const router = express.Router();

const ensuAuth = require("../middleware/authenticated")

const trainingInfoController = require('../controllers/nonImTrainingInfo')

router.post('/new-nonimtraininginfo', [ensuAuth.ensureAuth], trainingInfoController.createTrainingInfo)

module.exports = router