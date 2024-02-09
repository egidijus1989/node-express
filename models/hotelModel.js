const mongoose = require("mongoose")

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
    ranking:{
        type:String,
        default:1.2,
    },
    room_price:{
        type:Number,
        required:[true, "A hotel must have a price"]
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel