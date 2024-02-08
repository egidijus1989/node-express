const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
dotenv.config({path: './config.env'})
const port = process.env.PORT

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(con=>{
    console.log('Connected to MongoDB')
})

//Demo\\///////////////////////////////////////
const hotelSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "A hotel must have a name"],
        unique: true,
    },
    address:{
        type:String,
        required:[true, 'must have an address'],
    },
    room_price:{
        type:Number,
        required:[true, "A hotel must have a price"]
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema)

const testHotel = new Hotel({
    "name": "Geriausias viesbutis kaune",
    "address": "Laives51, Kaunas",
    "room_price": 350
})

testHotel.save().then(doc=>console.log(doc))
.catch(err=>{
    console.log(err)
})
//////////////////////////////////////////////

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})