const mongoose = require('mongoose')

const routineSchema = mongoose.Schema({
    order: { type: Number},
    trainings: { type: Array },
    finish: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Routine", routineSchema)