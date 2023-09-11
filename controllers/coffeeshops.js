const Coffeeshop = require("../models/coffeeshop");
module.exports.index = async (req, res) => {
  const coffeeshops = await Coffeeshop.find({}).lean();
  res.render("coffeeshops/index", { coffeeshops });
};

const prices = ["1", "2", "3", "4", "5"];

module.exports.createForm = (req, res) => {
  res.render("coffeeshops/createShopForm", prices);
};

module.exports.createSubmit = async (req, res) => {
  const coffeeshop = await new Coffeeshop(req.body.coffeeshop);
  console.log(coffeeshop);
  console.log(coffeeshop._id);
  await coffeeshop.save();
  res.redirect(`./coffeeshops/${coffeeshop._id}`);
};

module.exports.showCoffeeshop = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findById(id);
  res.render("coffeeshops/show", { coffeeshop });
};

module.exports.editCoffeeshop = async (req, res) => {
  const { id } = req.params;
  const coffeeshop = await Coffeeshop.findById(id);
  res.render("coffeeshops/edit", { coffeeshop, prices });
};

module.exports.submitEdit = async (req, res) => {
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
  res.redirect("/coffeeshops");
};