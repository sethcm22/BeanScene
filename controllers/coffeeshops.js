const Coffeeshop = require("../models/coffeeshop");
const Joi = require("joi");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");

module.exports.index = async (req, res) => {
  const coffeeshops = await Coffeeshop.find({}).lean();
  res.render("coffeeshops/index", { coffeeshops });
};

const prices = ["1", "2", "3", "4", "5"];

module.exports.renderCreateForm = (req, res) => {
  res.render("coffeeshops/createShopForm", prices);
};

module.exports.submitCreateForm = async (req, res, next) => {
  const coffeeshop = await new Coffeeshop(req.body.coffeeshop);
  coffeeshop.submittedBy = req.user._id;
  await coffeeshop.save();
  req.flash("success", "Made a new coffeeshop");
  res.redirect(`./coffeeshops/${coffeeshop._id}`);
};

module.exports.showCoffeeshop = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate({ path: "submittedBy" });
  if (!coffeeshop) {
    req.flash("error", "Sorry we couldn't find that Coffeeshop");
    return res.redirect("/coffeeshops");
  }
  res.render("coffeeshops/show", { coffeeshop });
};

module.exports.renderEditCoffeeshop = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findById(id);
  if (!coffeeshop) {
    req.flash("error", "Sorry we couldn't find that Coffeeshop");
    return res.redirect("/coffeeshops");
  }
  res.render("coffeeshops/edit", { coffeeshop, prices });
};

module.exports.submitEditForm = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findByIdAndUpdate(id, {
    ...req.body.coffeeshop,
  });
  await coffeeshop.save();
  res.redirect(`/coffeeshops/${coffeeshop._id}`);
};

module.exports.deleteCoffeeshop = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a Coffeeshop.");
  res.redirect("/coffeeshops");
};
