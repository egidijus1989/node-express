const fs = require('fs')
const Hotel = require('./../models/hotelModel')
const hotelListUnparsed = fs.readFileSync(`${__dirname}/../data/hotels.json`,"utf-8");
const hotels = JSON.parse(hotelListUnparsed)


//Callbacks\\/////////////////////////////////////////////

exports.getAllHotels = async (req, res)=>{
    try{
        const hotels = await Hotel.find()
        res.status(200).json({
            status: "success",
            results: `Is viso yra: ${hotels.length} viesbuciu`,
            data: {hotels}
        })
    }catch(err){
        
    }
}

exports.createHotel = async (req, res) =>{
    try{
        const newHotel = await Hotel.create(req.body)
        res.status(201).json({
            status: "success",
            message: "New hotel is created",
            data: {newHotel}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.getHotel = async (req, res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {hotel}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.updateHotel = async (req, res) =>{
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            message: "Hotel is updated",
            data: {hotel}
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}

exports.deleteHotel = async (req, res) =>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "hotel is deleted",
            data: null
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message:err
        })
    }
}
