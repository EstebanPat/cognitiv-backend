const mongoose = require('mongoose')

const suscriptionSchema = mongoose.Schema({
    active: { type: Boolean },
    user_id: { type: mongoose.Types.ObjectId, ref: 'User' },
    membership_id: { type: mongoose.Types.ObjectId, ref: 'Membership' },
    duration: { type: Number },
    voucher: { type: Array }
})

module.exports = mongoose.model("Suscription", suscriptionSchema)