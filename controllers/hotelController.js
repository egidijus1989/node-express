const fs = require('fs')
const hotelListUnparsed = fs.readFileSync(`${__dirname}/../data/hotels.json`,"utf-8");
const hotels = JSON.parse(hotelListUnparsed)

//

exports.idCheckMiddleware = (req, res, next) =>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    if(req.params.id > hotels.length){
        res.status(200).json({
        status: "fail",
        message: "Hotel id not found"
        })
        return
    }
    next()
}

//Callbacks\\/////////////////////////////////////////////

exports.getAllHotels = (req, res)=>{
    res.status(200).json({
        status: "success",
        results: `Is viso yra: ${hotels.length} viesbuciu`,
        data: {hotels}
    })
}

exports.createHotel = (req, res) =>{
    const newId = hotels[hotels.length-1].id+1;
    const hotelData = Object.assign({id:newId}, req.body)
    hotels.push(hotelData)
    fs.writeFileSync(`${__dirname}/data/hotels.json`, JSON.stringify(hotels, null, '\t'), err=>{
    res.status(201).json({
        status: "success",
        message: "Hotel is created",
        data: hotelData
    })
})
}

exports.getHotel = (req, res)=>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    res.status(404).json({
        status: "success",
        data: {hotel} 
    })
}

exports.updateHotel = (req, res) =>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    res.status(200).json({
        status: "success",
        message: "Hotel is updated",
        data: '<UPDATED>'
    })
}

exports.deleteHotel = (req, res) =>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    res.status(200).json({
        status: "success",
        message: "Hotel is deleted",
        data: null
    })
}
