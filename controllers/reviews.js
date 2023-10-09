const Coffeeshop = require("../models/coffeeshop");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  coffeeshop.reviews.push(review);
  await review.save();
  await coffeeshop.save();
  req.flash("success", "Successfully created a review.");
  res.redirect(`/coffeeshops/${id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const coffeeshop = await Coffeeshop.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const review = await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted a review.");
  res.redirect(`/coffeeshops/${id}`);
};
