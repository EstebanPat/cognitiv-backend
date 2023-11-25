const Routine = require('../models/routine')
const Training = require('../models/nonImTraining')

const createRoutine = async (order) => {
    try {
        const trainings = []
        const flexibilidad = await Training.aggregate([
            { $match: { type: "Flexibilidad" }},
            { $sample: { size: 2}}
        ]);
        const fuerza = await Training.aggregate([
            { $match: { type: "Fuerza muscular" }},
            { $sample: { size: 1}}
        ]);
        
        const resistencia = await Training.aggregate([
            { $match: { type: "Resistencia aerobica" }},
            { $sample: { size: 1}}
        ]);
        const equilibrio = await Training.aggregate([
            { $match: { type: "Equilibrio" }},
            { $sample: { size: 1}}
        ]);

        trainings.push(flexibilidad[0]._id);
        trainings.push(fuerza[0]._id);
        trainings.push(resistencia[0]._id);
        trainings.push(equilibrio[0]._id);
        trainings.push(flexibilidad[1]._id);

        const new_routine = await Routine({
            order: order, finish: false, trainings: trainings
        }) 
        
        const routineDB = await new_routine.save()
        return routineDB
    } catch (error) {
        console.log(error);
    }
}

const getRoutineById = async (req, res) => {
    const { routineId } = req.params
    try {
      const response = await Routine.findById(routineId);
      if(!response){
        throw new Error("El usuario no existe")
      }else{
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(400).json(error)
    }
}

module.exports = {
    createRoutine,
    getRoutineById
}