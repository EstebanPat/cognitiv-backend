const mongoose = require('mongoose')
require('dotenv').config();
const app = require('./app')

const connection_string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`

mongoose.connect(connection_string, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=> {
            app.listen(process.env.PORT)
        })
