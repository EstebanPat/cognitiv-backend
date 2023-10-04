const express = require('express')
const bodyParser = require("body-parser")
const userRoutes = require('./routes/user')

require('dotenv').config()

const app= express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(`${process.env.API}${process.env.API_VERSION}users`, userRoutes)

module.exports = app