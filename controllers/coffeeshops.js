const Coffeeshop = require("../models/coffeeshop");
const Joi = require("joi");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { cloudinary } = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mbxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

module.exports.index = async (req, res) => {
  const coffeeshops = await Coffeeshop.find({});
  res.render("coffeeshops/index", { coffeeshops });
};

const prices = ["1", "2", "3", "4", "5"];

module.exports.renderCreateForm = (req, res) => {
  res.render("coffeeshops/createShopForm", prices);
};

module.exports.submitCreateForm = async (req, res, next) => {
  const coffeeshop = await new Coffeeshop(req.body.coffeeshop);
  const geoData = await geocoder
    .forwardGeocode({ query: coffeeshop.location, limit: 1 })
    .send();
  coffeeshop.geometry = geoData.body.features[0].geometry;
  coffeeshop.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
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
  console.log(req.body);
  const coffeeshop = await Coffeeshop.findByIdAndUpdate(id, {
    ...req.body.coffeeshop,
  });
  const images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  coffeeshop.images.push(...images);
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await coffeeshop.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  await coffeeshop.save();
  req.flash("success", "Edit was successful.");
  res.redirect(`/coffeeshops/${coffeeshop._id}`);
};

module.exports.deleteCoffeeshop = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a Coffeeshop.");
  res.redirect("/coffeeshops");
};
