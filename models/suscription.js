const mongoose = require('mongoose')

const suscriptionSchema = mongoose.Schema({
    active: { type: Boolean, default: false },
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    membership_id: { type: mongoose.Types.ObjectId, ref: 'Membership' },
    duration: { type: Number },
    voucher: { type: String },
    start_date: { type: Date },
    expiration_date: { type: Date }
})

module.exports = mongoose.model("Suscription", suscriptionSchema)