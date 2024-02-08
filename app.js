const fs = require('fs')
const express = require('express')
const hotelListUnparsed = fs.readFileSync(`${__dirname}/data/hotels.json`,"utf-8");
const hotels = JSON.parse(hotelListUnparsed)
const hotelsRouter = express.Router()
const app = express()
const router = express.Router()
app.use(express.json())

//middleware\\/////////////////////////////////////////////

const idCheckMiddleware = (req, res, next) =>{
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

hotelsRouter.param("id", idCheckMiddleware)

//Callbacks\\/////////////////////////////////////////////

const getAllHotels = (req, res)=>{
    res.status(200).json({
        status: "success",
        results: `Is viso yra: ${hotels.length} viesbuciu`,
        data: {hotels}
    })
}

const createHotel = (req, res) =>{
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

const getHotel = (req, res)=>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    res.status(404).json({
        status: "success",
        data: {hotel} 
    })
}

const updateHotel = (req, res) =>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    res.status(200).json({
        status: "success",
        message: "Hotel is updated",
        data: '<UPDATED>'
    })
}

const deleteHotel = (req, res) =>{
    const hotel = hotels.find((hotel) => req.params.id == hotel.id)
    res.status(200).json({
        status: "success",
        message: "Hotel is deleted",
        data: null
    })
}

//routes\\/////////////////////////////////////////////////
app.use('/api/v1/hotels', hotelsRouter)

hotelsRouter.route("/")
.get(getAllHotels)
.post(createHotel)

hotelsRouter.route("/:id")
.get(idCheckMiddleware, getHotel)
.patch(idCheckMiddleware, updateHotel)
.delete(idCheckMiddleware, deleteHotel)

//Server\\/////////////////////////////////////////////////
const port = "8888"

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`)
})


//kiti middleware\\/////////////////////////////////////////
function getId(){

}