const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewsController = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");

router.post("/", catchAsync(reviewsController.createReview));

router.delete("/:reviewId", catchAsync(reviewsController.deleteReview));

module.exports = router;
