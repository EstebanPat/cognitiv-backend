const mongoose = require('mongoose')

const nonImTrainingInfoSchema = mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId , ref: "User"},
    routine_id: { type: mongoose.Types.ObjectId, ref: "Routine"},
    routinelist_id: { type: mongoose.Types.ObjectId, ref: "RoutineList"},
    trainings_times: { type: Array}
})

module.exports = mongoose.model("NonImTrainingInfo",nonImTrainingInfoSchema)