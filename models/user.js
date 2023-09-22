const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    names: { type: String, require: true},
    lastnames: { type: String, required: true },
    birthDay: { type: Date},
    documentType: { type: String, required: true },
    identification: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    genre: { type: String, required: true },
    schooling: { type: String, required: true },
    active: { type: Boolean},
    rol: { type: String }
})

module.exports = mongoose.model("User", userSchema)