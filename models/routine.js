const mongoose = require('mongoose')

const routineSchema = mongoose.Schema({
    order: { type: Number},
    trainings: { type: Array },
    finish: { type: Boolean }
})

module.exports = mongoose.model("Routine", routineSchema)