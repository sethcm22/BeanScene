const Coffeeshop = require("./models/coffeeshop");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in");
    return res.redirect("/login");
  }
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findById(id);
  if (!coffeeshop.submittedBy.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that");
    return res.redirect(`/coffeeshops/${id}`);
  }
  next();
};

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
