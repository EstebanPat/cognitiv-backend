const nodemailer = require('nodemailer');
const fs = require('fs')
const jwt = require("../utils/jwt")

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
                path: 'C:/Users/esteb/Documents/Cognitiv/server-project/uploads/logos/logo.png',
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
    sendEmail
}

  