const nodemailer = require('nodemailer');
const jwt = require("../utils/jwt")
const logoPath = './uploads/logos/logo.png';
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'uamcognitiv@gmail.com',
        pass: process.env.EMAIL_PASS  
    }
});

const sendEmail = async (user) => {
    const token = jwt.createAccessToken(user)
    const mailOptions = {
        from: 'manuel121938@gmail.com',
        to: `${user.email}`,
        subject: 'Confirmación de registro',
        html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            border: 3px solid #357960;
                            border-radius: 10px;
                            width:600px;
                        }
                        h3{
                            color: #357960;
                            margin:5px;
                            margin-top:40px;
                        }
                        
                        h2{
                            color: #357960;
                            margin:5px;
                            margin-top:20px;
                        }
                        
                        img{
                            width:300px;
                        }
                        
                        p{
                            margin-top:20px;
                            margin-bottom:25px;
                        }
                    </style>
                </head>
                <body>
                    <div style="border: 3px solid #357960; border-radius: 10px; width: 600px; height: 400px; background-color: white; display: table-cell; text-align: center; vertical-align: middle; ">
                        <img src="cid:unique@nodemailer.com" alt="Logo">

                        <h3>Bienvenido a la familia Cognitiv</h3>
                        <h2>${user.names}</h2>
                        <p>Si deseas activar tu cuenta en COGNITIV</p>
                        <p>da click en el siguiente enlace</p>
                        <a style="background-color: #357960; border: none; color: white; padding: 10px 22px; text-align: center; text-decoration: none; font-size: 16px; border-radius: 10px; transition-duration: 0.4s; color: white;" href="http://localhost:3001/activateAccount?token=${token}">ACTIVAR CUENTA
                        </a>
                    </div>
                </body>
            </html>
        `,
        attachments: [
            {
                filename: 'logo.png',
                path: logoPath,
                cid: 'unique@nodemailer.com'
            }
        ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        }
    })
}

const sendForgotEmail = async (user) => {
    const token = jwt.createAccessToken(user)
    const mailOptions = {
        from: 'manuel121938@gmail.com',
        to: `${user.email}`,
        subject: 'SOLICITUD DE RESTABLECIMIENTO DE CONTRASEÑA',
        html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            border: 3px solid #357960;
                            border-radius: 10px;
                            width:600px;
                            
                        }
                        h3 {
                            color: #357960;
                            margin:5px;
                            margin-top:45px;
                        }
                        
                        img{
                            width:300px;
                        }
                        
                        p{
                            margin-top:20px;
                            margin-bottom:25px;
                        }
                    </style>
                </head>
                <body>
                    <div style="border: 3px solid #357960; border-radius: 10px; width: 600px; height: 400px; background-color: white; display: table-cell; text-align: center; vertical-align: middle; ">
                        <img src="cid:unique@nodemailer.com" alt="Logo">
                        <h3>Bienvenido ${user.names}</h3>
                        <p>Hemos recibido una solicitud para restablecer tu contraseña</p>
                        <p>Para realizar el cambio, sigue el siguiente enlace</p>
                        <a color="white" style="background-color: #357960; border: none; color: white; padding: 10px 22px; text-align: center; text-decoration: none; font-size: 16px; border-radius: 10px; transition-duration: 0.4s; color: white;" href="http://localhost:3001/changepassword?token=${token}">Restablecer contraseña</a>
                        <p>Si no fuiste tú, haz caso omido a este correo</p>
                    </div>
                </body>
            </html>
        `,

        attachments: [
            {
                filename: 'logo.png',
                path: logoPath,
                cid: 'unique@nodemailer.com'
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        }
    })
}

module.exports = {
    sendEmail,
    sendForgotEmail
}

  