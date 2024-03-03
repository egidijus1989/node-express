const mongoose = require("mongoose");
const User = require("./userModel");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A hotel must have a name"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "must have an address"],
    },
    rankingAverage: {
      type: Number,
      default: 4.5,
      min: [1, "ranking must be above 1"],
      max: [5, "ranking cannot be more than 5"],
    },
    room_price: {
      type: Number,
      required: [true, "A hotel must have a price"],
    },
    price_discount: {
      type: Number,
    },
    comfort: {
      type: String,
      required: [true, "a hotel must have  confort level"],
      enum: {
        values: ["1", "2", "3", "4", "5", "6", "7"],
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, "must have a summary"],
    },
    description: {
      type: String,
      trim: true,
    },
    image_cover: {
      type: String,
      required: [true, "musta have a image cover"],
    },
    //child ref
    managers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

hotelSchema.pre(/^find/, function (next) {
  this.populate({
    path: "managers",
    select: "name",
  });
  this.populate({
    path: "rooms",
    select: "roomNumber",
  });
  next();
});

hotelSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "hotel",
  localField: "_id",
});

//Embedinimas - tinka tik statiskui metodui////////////////
// managers: Array, 48 eiluteje
// hotelSchema.pre("save", async function(){
//     const managersPromise = this.managers.map(async id => User.findById(id))
//     this.managers = await Promise.all(managersPromise)
// })
//

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
