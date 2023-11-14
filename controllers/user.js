const User = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt")

const sendEmailController = require('./sendEmail')
// LogIn

const login = async (req, res) => {
  const { identification, password } = req.body;
  try {
    const userStore = await User.findOne({ identification: identification });
    if (!userStore) {
      throw new Error("El usuario no existe");
    }
    const check = await bcrypt.compare(password, userStore.password);
    if (!check) {
      throw new Error("Contraseña incorrecta");
    }
    res.status(200).send({
      access: jwt.createAccessToken(userStore),
      refresh: jwt.createRefreshToken(userStore)
    });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// Register User

const register = async (req, res) => {
    const { names, lastnames, email, password, phone, genre, birthDay, schooling, documentType
    , identification, attendant} = req.body;
    

    if(names  && lastnames  && email  && password  && phone  &&
        genre  && birthDay  && schooling  && documentType  && 
        identification ){

            const crypt = await bcrypt.genSalt(10)
            const crypt_password = await bcrypt.hash(password, crypt)

            const new_user = await User({
                names, lastnames, email, password: crypt_password, phone, genre
                , birthDay: new Date(birthDay), schooling, documentType, identification, attendant
            })
            try {
                
                const userDB = await new_user.save()
                await sendEmailController.sendEmail(email, names)
                res.status(201).json(userDB)
            } catch (error) {
                res.status(400).json({error: "La identificacion ya fue registrada"})
            }
            
    } else {
        res.status(400).json({error: "Faltan Campos requeridos"})
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
    login,
    register,
    getAllUsers,
    deleteUser
}