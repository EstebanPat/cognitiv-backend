const User = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt")


// Register User

const register = async (req, res) => {
    const { names, lastnames, email, password, phone, genre, birthday, schooling, documentType
    , identification} = req.body;
    
    

    if(names  && lastnames  && email  && password  && phone  &&
        genre  && birthday  && schooling  && documentType  && 
        identification !== null){

            const crypt = await bcrypt.genSalt(10)
            const crypt_password = await bcrypt.hash(password, crypt)

            const new_user = await User({
                names, lastnames, email: email.toLowerCase(), password: crypt_password, phone, genre
                , birthDay: new Date(birthday), schooling, documentType, identification
            })
            try {
                const userDB = await new_user.save()
                res.status(201).json(userDB)
            } catch (error) {
                res.status(400).json("La identificación ya fue registrada")
            }
            
    } else {
        res.status(400).json("Faltan Campos requeridos")
    }

}

const getAllUsers = async(req, res) => {
    try {
      const response = await User.find()
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
      
};

const deleteUser =async (req, res) => {
    try {
      const { userId } = req.params
      await User.findByIdAndDelete(userId)
      res.status(200).json({ message: "Usuario eliminado"})
    } catch (error) {
      res.status(400).json(error)
    } 
  }

module.exports = {
    register,
    getAllUsers,
    deleteUser
}