const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});
ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});
const options = { toJSON: { virtuals: true } };

const CoffeeshopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: [ImageSchema],

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
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
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
