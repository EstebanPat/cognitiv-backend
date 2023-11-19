const nodemailer = require('nodemailer');
const fs = require('fs')
const jwt = require("../utils/jwt")
const logoPath = './uploads/logos/logo.png';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        /* user: 'manuel121938@gmail.com',
        pass: 'zdsf ubzd xsqe cnat' */
        user: 'estebanpatinogaviria@gmail.com',
        pass: 'xvha szrp rzij luwc'
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
            </head>
            <body>
                
                <img src="cid:unique@nodemailer.com" alt="Logo">
                <h3>Bienvenido ${user.names}</h3>
                <p>Si deseas activar tu cuenta en COGNITIV da click en el siguiente enlace</p>

                <a href="http://localhost:3001/activateAccount?token=${token}">ACTIVAR CUENTA</a>

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
            </head>
            <body>
                
                <img src="cid:unique@nodemailer.com" alt="Logo">
                <h3>Bienvenido ${user.names}</h3>
                <p>Hemos recibido una solicitud para restablecer tu contraseña</p>
                <p>Para realizar el cambio, sigue el siguiente enlace</p>
                <a href="http://localhost:3001/changepassword?token=${token}">Restablecer contraseña</a>
                <p>Si no fuiste tú, haz caso omido a este correo</p>

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

  