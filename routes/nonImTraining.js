const express = require('express')
const router = express.Router();

const trainingController = require('../controllers/nonImTraining')

router.post("/new-nonimtraining", trainingController.createTraining);
router.get("/", trainingController.getAllTrainings);
router.delete("/delete/:trainingId", trainingController.deleteTraining);

module.exports = router