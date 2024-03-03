const Room = require("../models/roomModel");
const Hotel = require("../models/reviewModel");

//getAllRooms//////////////////////////////////////////////////
exports.getAllRooms = async (req, res) => {
  try {
    let filter = {};
    if (req.params.hotelId) filter = { hotel: req.params.hotelId };
    const rooms = await Room.find(filter);
    res.status(200).json({
      status: "Success",
      result: rooms.length,
      data: { rooms },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//getRoom//////////////////////////////////////////////////////
exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { room },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//getAllBookedRooms////////////////////////////////////////////
exports.getAllBookedRooms = async (req, res) => {
  try {
    const allRooms = await Room.find({ booked: true });
    res.status(200).json({
      status: "Success",
      result: allRooms.length,
      data: { allRooms },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//getYourBookedRooms///////////////////////////////////////////
exports.getYourBookedRooms = async (req, res) => {
  try {
    if (!req.body.user) req.body.user = req.user.id;
    const allRooms = await Room.find({ booked: true, user: req.user.id });
    res.status(200).json({
      status: "Success",
      result: allRooms.length,
      data: { allRooms },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
};
//createRoom///////////////////////////////////////////////////
exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json({
      status: "success",
      message: "New room is created",
      data: { newRoom },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//updateRoom///////////////////////////////////////////////////
exports.updateRoom = async (req, res) => {
  try {
    if (!req.body.user) req.body.user = req.user.id;
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "Room is updated",
      data: { room },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//deleteRoom///////////////////////////////////////////////////
exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "room is deleted",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
