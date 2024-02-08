const express = require('express')
const morgan = require('morgan')
const hotelsRouter = require('./routes/hotelRoutes')
const app = express()
const router = express.Router()
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/v1/hotels', hotelsRouter)



//Server\\/////////////////////////////////////////////////


module.exports = app;