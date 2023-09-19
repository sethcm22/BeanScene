const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  text: {
    type: String,
  },
  rating: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
