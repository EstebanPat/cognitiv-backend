const express = require('express')
const bodyParser = require("body-parser")
const userRoutes = require('./routes/user')

require('dotenv').config()

const app= express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(`${process.env.API}${process.env.API_VERSION}users`, userRoutes)

module.exports = app