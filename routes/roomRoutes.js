const express = require("express");
const router = express.Router({ mergeParams: true });

const roomController = require("../controllers/roomController");
const authController = require("./../controllers/authController");

router
  .route("/")
  .get(roomController.getAllRooms)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.createRoom
  );

router.route("/:id").patch(authController.protect, roomController.updateRoom);

router
  .route("/booked")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    roomController.getAllBookedRooms
  );

router
  .route("/booked/user")
  .get(authController.protect, roomController.getYourBookedRooms);
module.exports = router;
