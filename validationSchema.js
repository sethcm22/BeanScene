const Joi = require("joi");
const ExpressError = require("./utils/ExpressError");

const coffeeshopSchema = Joi.object({
  coffeeshop: Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    images: Joi.string(),
  }).required(),
});

module.exports.validateCoffeeshop = (req, res, next) => {
  const { error } = coffeeshopSchema.validate(req.body);
  if (error) {
    console.log(error);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const reviewSchema = Joi.object({
  review: Joi.object({
    text: Joi.string().required(),
    price: Joi.number().required().min(1).max(5),
  }).required(),
});

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error);
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
