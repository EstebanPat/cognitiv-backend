const Training = require('../models/nonImTraining')

const createTraining = async (req, res) => {
    const { type, name, video, description } = req.body

    if(type !== null && name !== null && video !== null && description !== null){
        const new_training = await Training({
            name, type, video, description
        }) 
        try {
            const trainingDB = await new_training.save()
            res.status(201).json(trainingDB)
        } catch (error) {
            res.status(400).json(error)
        }
        
    }else{
        res.status(400).json({error: "Faltan Campos requeridos"})
    }
}

const getAllTrainings = async (req, res) => {
    try {
        const response = await Training.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteTraining = async (req, res) => {
    try {
        const { trainingId } = req.params;
        await Training.findByIdAndDelete(trainingId);
        res.status(200).json({ message: "Entrenamiento Eliminado"});
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createTraining,
    getAllTrainings,
    deleteTraining
}