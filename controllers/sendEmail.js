const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'manuel121938@gmail.com',
        pass: 'zdsf ubzd xsqe cnat'
    }
});



const sendEmail = async (email, names) => {
    const mailOptions = {
        from: 'manuel121938@gmail.com',
        to: `${email}`,
        subject: 'Confirmacion de registro',
        text: `Bienvend@ ${names} de click en el siguiente enlace para confirmar su regsitro en COGNITIV`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
        }else{
            console.log(info);
        }
    })
}

module.exports = {
    sendEmail
}

  