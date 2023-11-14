const express = require('express')
const router = express.Router();

const trainingController = require('../controllers/nonImTraining')

router.post("/new-nonimtraining", trainingController.createTraining)
router.get("/", trainingController.getAllTrainings)

module.exports = router