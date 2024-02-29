//sukurti atsiliepimu modeli su review, rating, reatedAt, hotel, user
const mongoose = require("mongoose")
// const Hotel = require("./hotelModel")
// const User = require("./userModel")

const reviewSchema = new mongoose.Schema({
    review:{
    type: String,
    required: [true, 'Review cannot be empty'],
    },
    rating:{
        type: Number,
        enum:[1, 2, 3, 4, 5],
        required:[true, "Must leave a rating"]
    },
    hotel:{
        type:mongoose.Schema.ObjectId,
        ref:"Hotel",
        required: [true, "You must select a hotel"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required: [true, "You must select a user"]
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
})

reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:"hotel",
        select: "name"
    }).populate({
        path: "user",
        select: "name"
    })
    next()
})

const Review = mongoose.model("Review", reviewSchema)
module.exports = Review