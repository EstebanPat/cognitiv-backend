const express = require('express')
const bodyParser = require("body-parser")
const userRoutes = require('./routes/user')
const membershipRoutes = require('./routes/membership')
const suscriptionRoutes = require('./routes/suscription')
const nonImTrainingRoutes = require('./routes/nonImTraining')
const routineListRoutes = require('./routes/routineList')
const routineRoutes = require("./routes/routine")
const nonImTrainingInfoRoutes = require('./routes/nonImTrainingInfo')
const cors = require('cors')

require('dotenv').config()

const app= express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));

app.use(cors());  

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(`${process.env.API}${process.env.API_VERSION}users`, userRoutes)
app.use(`${process.env.API}${process.env.API_VERSION}memberships`, membershipRoutes)
app.use(`${process.env.API}${process.env.API_VERSION}suscriptions`, suscriptionRoutes)
app.use(`${process.env.API}${process.env.API_VERSION}nonimtrainings`, nonImTrainingRoutes)
app.use(`${process.env.API}${process.env.API_VERSION}routines`, routineListRoutes)
app.use(`${process.env.API}${process.env.API_VERSION}routine`, routineRoutes)
app.use(`${process.env.API}${process.env.API_VERSION}nonimtrainingsinfo`, nonImTrainingInfoRoutes)


module.exports = app