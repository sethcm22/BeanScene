const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewsController = require("../controllers/reviews");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateReview } = require("../middleware");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(reviewsController.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  catchAsync(reviewsController.deleteReview)
);

module.exports = router;
