const express = require('express')
const morgan = require('morgan')
const hotelsRouter = require('./routes/hotelRoutes')
const usersRouter = require('./routes/userRoutes')
const app = express()
const router = express.Router()
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/v1/hotels', hotelsRouter);
app.use('/api/v1/users', usersRouter);



//Server\\/////////////////////////////////////////////////


module.exports = app;