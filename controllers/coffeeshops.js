const Coffeeshop = require("../models/coffeeshop");
module.exports.index = async (req, res) => {
  const coffeeshops = await Coffeeshop.find({}).lean();
  res.render("coffeeshops/index", { coffeeshops });
};

module.exports.createForm = (req, res) => {
  res.render("coffeeshops/createShopForm");
};

module.exports.createSubmit = async (req, res) => {
  const coffeeshop = await new Coffeeshop(req.body.coffeeshop);
  await coffeeshop.save();
  res.redirect("/coffeeshops");
  // res.redirect(`./coffeeshops/${coffeeshop._id}`);
};
