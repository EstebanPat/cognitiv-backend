const User = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("../utils/jwt")
const sendEmailController = require('./sendEmail')

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

    if(userStore.active === false){
      throw new Error("Debe activar su cuenta para acceder");
    }

    res.status(200).send({
      access: jwt.createAccessToken(userStore),
      refresh: jwt.createRefreshToken(userStore)
    });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

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
                await sendEmailController.sendEmail(userDB)
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

const getById = async (req, res) =>{
  const {userId} = req.params;
  try {
    const response = await User.findById(userId)  
    if(!response){
      throw new Error("El usuario no existe")
    }else{
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error)
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

const activateAccount = async (req, res) => {
  try {
    const { user_id } = req.user
    await User.findByIdAndUpdate(user_id, { active: true })
    res.status(200).json({ message: "Usuario activado" })
  } catch (error) {
    res.status(400).json(error);
  }
}

const updateUser = async (req, res) => {
  try{
    const { userId } = req.user
    const userData = req.body;
    if(userData.password){
      const enscriptar_contraseña = await bcrypt.genSalt(10);
      const contrasena = await bcrypt.hash(password, enscriptar_contraseña)
      userData.password = contrasena
    }
    await User.findByIdAndUpdate(userId, userData);
    res.status(200).json({ message: "Usuario actualizado" })
  }catch (error){
    res.status(400).json(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { identification } = req.params;
    const user = await User.findOne({ identification: identification });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    await sendEmailController.sendForgotEmail(user)
    res.status(200).json({ message: 'Correo enviado' });
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

module.exports = {
    login,
    register,
    getById,
    getAllUsers,
    deleteUser,
    activateAccount,
    updateUser,
    forgotPassword
}