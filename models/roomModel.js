const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, "room must have a number"],
  },
  description: {
    type: String,
    required: [true, "room must have a description"],
  },
  photo: {
    type: String,
    required: [true, "room must have a photo"],
  },
  extra: {
    type: String,
    required: [true, "room must have an extra"],
    enum: ["free parking", "wifi", "free brakfast", "free brakfast and dinner"],
  },
  booked: {
    type: Boolean,
    default: false,
  },
  from: {
    type: Date,
  },
  to: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "You must select a user"],
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
