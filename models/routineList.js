const mongoose = require('mongoose')
const User = require('./user')

const routineList = mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    routines: { type: Array },
    finished: { type: Boolean }
})

module.exports = mongoose.model("RoutineList", routineList)