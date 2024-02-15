const express = require('express');
const router = express.Router();
const hotelController = require("../controllers/hotelController")

router.route("/top-5-best")
.get(hotelController.aliasTopHotels, hotelController.getAllHotels)

router.route("/")
.get(hotelController.getAllHotels)
.post(hotelController.checkBody, hotelController.createHotel)

router.route("/:id")
.get(hotelController.getHotel)
.patch(hotelController.updateHotel)
.delete(hotelController.deleteHotel)

module.exports = router