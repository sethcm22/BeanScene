const Joi = require("joi");

module.exports.coffeeshopSchema = Joi.object({
  coffeeshop: Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    // images: Joi.string(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    text: Joi.string().required(),
    price: Joi.number().required().min(1).max(5),
    // author: Joi.string().required(),
  }).required(),
});
