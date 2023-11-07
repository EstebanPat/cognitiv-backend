const Suscription = require('../models/suscription')
const Membership = require('../models/membership')
const User = require('../models/user')
const img = require("../utils/image")


const createSuscription = async (req, res) => {
 
    const { user_id, membership_id, duration } = req.body;
    const files = req.file.path;
    const actual_date = new Date();
    const exp_date = new Date();
    actual_date.setDate(actual_date.getDate() - 1)
    const membershipExists = await Membership.exists({ _id: membership_id }) 
    const userExists = await User.exists({ _id: user_id })
    if (membershipExists && userExists) {
    
        if (duration !== null && user_id !== null && membership_id !== null && files !== null) {
            vouch = files.replaceAll("\\", "/")
            const new_suscription = await Suscription({
                user_id, membership_id, duration, voucher: "/" + vouch,
                start_date: actual_date, expiration_date: exp_date.setMonth(exp_date.getMonth() +12)
            })
            
            const suscriptionDB = await new_suscription.save()
            res.status(201).json(suscriptionDB)
        }else{
            res.status(400).json({error: "Faltan Campos requeridos"})
        }
    }else {
        res.status(404).json({ error: 'El ID de referencia no existe en la base de datos.' });
    }
    
    
}


const getAllSuscriptions = async (req, res) => {
    try {
        const response = await Suscription.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

const deleteSuscription = async (req, res) => {
    try {
        const { suscriptionId } = req.params
        await Suscription.findByIdAndDelete(suscriptionId)
        res.status(200).json({ message: "Suscripcion Eliminada"})
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createSuscription,
    getAllSuscriptions,
    deleteSuscription
}