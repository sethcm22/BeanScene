const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

// const options = { toJSON: { virtuals: true } };

const CoffeeshopSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  images: [ImageSchema],
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  submittedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
  website: {
    type: String,
    required: false,
  },
});

const Coffeeshop = mongoose.model("Coffeeshop".CoffeeshopSchema);
module.exports = Coffeeshop;
