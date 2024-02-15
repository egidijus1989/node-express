const fs = require('fs')
const Hotel = require('./../models/hotelModel')
const hotelListUnparsed = fs.readFileSync(`${__dirname}/../data/hotels.json`,"utf-8");
const hotels = JSON.parse(hotelListUnparsed)


//Callbacks\\/////////////////////////////////////////////
exports.checkBody = (req, res, next) =>{
    if(!req.body.name || !req.body.room_price){
        return res.status(400).json({
            status: "Fail",
            message: "Missing name ir price"
        })
    }
    next()
}

exports.aliasTopHotels = (req, res, next) =>{
    req.query.limit = "5";
    req.query.sort = "-comfort, room_price";
    req.query.fields = "name, room_price, comfort";
    next()
}

exports.getAllHotels = async (req, res)=>{
    try{
        const queryObj = {...req.query}
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el)=>{delete queryObj[el]});
        //Filter\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`)
        let query = Hotel.find(JSON.parse(queryStr));
        //Sort\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('createdAt')
        }
        //Field limiting\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        if(req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields)
        }else{
            query = query.select('-__v')
        }
        //Pagination\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        const page = req.query.page*1 || 1;
        const limit = req.query.limit*1||100;
        const skip = (page-1)*limit
 
        query = query.skip(skip).limit(limit);
 
        if(req.query.page){
            const numberHotels = await Hotel.countDocuments();
            if(skip>=numberHotels) throw new Error('This page dosn exist')
        }
        //Response\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        const hotels = await query;
        res.status(200).json({
            status: "success",
            results: hotels.length,
            data: {hotels}
        })
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err.message
        })
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
