const Membership = require('../models/membership')

const createMembership = async (req, res) =>{

    const { type, description, price } = req.body

    if(type !== null && description !== null && price !== null){
        const new_membership = await Membership({
            type, description, price
        }) 

        const membershipDB = await new_membership.save()
        res.status(201).json(membershipDB)

    }else{
        res.status(400).json({error: "Faltan Campos requeridos"})
    }
}

//Obtener todas las categorias
const getAllMemberships = async (req, res) => {
    try {
        const response = await Membership.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}


//Eliminar Categoria

const deleteMembership = async (req, res) => {
    try {
        const { membershipId } = req.params
        await Membership.findByIdAndDelete(membershipId)
        res.status(200).json({ message: "Membresia Eliminada"})
      } catch (error) {
        res.status(400).json(error)
      } 
}

module.exports = {
    createMembership,
    getAllMemberships,
    deleteMembership
}