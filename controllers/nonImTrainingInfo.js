const TrainingInfo = require('../models/nonImTrainingInfo')


const createTrainingInfo = async (req, res) => {
    const { user_id } = req.user;
    const { routine_id, routinelist_id, trainings_times} = req.body;

    if(routine_id !== null && routinelist_id !== null && trainings_times !== null && user_id !== null){
        const new_trainingInfo = await TrainingInfo({
            routine_id, routinelist_id, user_id, trainings_times
        }) 
        try {
            const trainingInfoDB = await new_trainingInfo.save()
            res.status(201).json(trainingInfoDB)
        } catch (error) {
            res.status(400).json(error)
        }
        
    }else{
        res.status(400).json({error: "Faltan Campos requeridos"})
    }
}

module.exports= {
    createTrainingInfo
}