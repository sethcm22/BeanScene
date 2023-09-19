const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewsController = require("../controllers/reviews");

router.post("/", reviewsController.createReview);

router.delete("/:id", reviewsController.deleteReview);

module.exports = router;
