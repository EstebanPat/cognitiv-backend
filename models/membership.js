const mongoose = require('mongoose')

const membershipSchema = mongoose.Schema({
    type: { type: String},
    description: { type: mongoose.Schema.Types.String, index: 'text'},
    price: { type: Number }

})

module.exports = mongoose.model("Membership", membershipSchema)