const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const authController = require("./../controllers/authController");

router
  .route("/top-5-best")
  .get(hotelController.aliasTopHotels, hotelController.getAllHotels);

router
  .route("/")
  .get(authController.protect, hotelController.getAllHotels)
  .post(hotelController.checkBody, hotelController.createHotel);

router
  .route("/:id")
  .get(hotelController.getHotel)
  .patch(hotelController.updateHotel)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    hotelController.deleteHotel);

module.exports = router;
