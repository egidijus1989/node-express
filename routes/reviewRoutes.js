const express = require("express")
const router = express.Router({mergeParams: true});

const reviewController = require("../controllers/reviewController")
const authController = require("../controllers/authController")

router.use(authController.protect)

// router.get("/", 
// authController.protect,
// authController.restrictTo("admin"),
// reviewController.getAllReviews)
// router.post("/", 
// authController.protect,
// reviewController.createReview)

router.route("/")
.get(authController.restrictTo("admin"), reviewController.getAllReviews)
.post(reviewController.createReview)

module.exports = router;