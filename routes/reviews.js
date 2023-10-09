const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewsController = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");
const { validateReview } = require("../validationSchema");
const { isLoggedIn, isOwner } = require("../middleware");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(reviewsController.createReview)
);

router.delete(
  "/:reviewId",
  isOwner,
  isLoggedIn,
  catchAsync(reviewsController.deleteReview)
);

module.exports = router;
