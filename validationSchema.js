const Joi = require("joi");
const ExpressError = require("./utils/ExpressError");

const coffeeshopSchema = Joi.object({
  coffeeshop: Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    description: Joi.string().required(),
    location: Joi.string().required(),
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
