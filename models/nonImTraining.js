const mongoose = require('mongoose')

const nonImTrainingSchema = mongoose.Schema({
    name: { type: String },
    type: { type: String },
    video: { type: String },
    description: { type: String }
})

module.exports = mongoose.model("NonImTraining", nonImTrainingSchema)