const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");

// const ImageSchema = new Schema({
//   url: String,
//   filename: String,
// });

// const options = { toJSON: { virtuals: true } };

const CoffeeshopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // images: {
  //   type: String,
  // },
  price: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  // website: {
  //   type: String,
  //   required: false,
  // },
});

//      Mongoose Query middleware. Needs to be post() so query runs first.
CoffeeshopSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
  }
});

const Coffeeshop = mongoose.model("Coffeeshop", CoffeeshopSchema);
module.exports = Coffeeshop;
