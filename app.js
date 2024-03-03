const express = require("express");
const morgan = require("morgan");
const hotelsRouter = require("./routes/hotelRoutes");
const usersRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const roomRouter = require("./routes/roomRoutes");
const app = express();
const router = express.Router();
app.use(express.json());

app.use(morgan("dev"));
app.use("/api/v1/hotels", hotelsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/rooms", roomRouter);

//Server\\/////////////////////////////////////////////////

module.exports = app;
