const RoutineList = require('../models/routineList')
const Routine = require('./routine')
const createList = async(req, res) =>{
    const { user_id } = req.user
    try {
        const list = []
        const routineList = []
        
        for (let i = 0; i < 20; i++) {
            list.push( await Routine.createRoutine(i + 1))
        }

        for (let i = 0; i < list.length; i++) {
            routineList.push(list[i]._id)
        }

        const new_list = await RoutineList({
            user_id: user_id, routines: routineList, finished: false
        })

        const listDB = await new_list.save()
        res.status(201).json(listDB)
    } catch (error) {
        res.status(400).json({error: "Error al crear lista de rutinas"})
    }
}

const getAllRoutinesList = async (req, res) => {
    try {
        const response = await RoutineList.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    createList,
    getAllRoutinesList
}