const express = require("express");
const router = express.Router();
const coffeeshopsController = require("../controllers/coffeeshops");

router
  .route("/")
  .get(coffeeshopsController.index)
  .post(coffeeshopsController.submitCreateForm);

router.route("/create").get(coffeeshopsController.renderCreateForm);

router
  .route("/:id")
  .get(coffeeshopsController.showCoffeeshop)
  .put(coffeeshopsController.submitEditForm)
  .delete(coffeeshopsController.deleteCoffeeshop);

router.route("/:id/edit").get(coffeeshopsController.renderEditCoffeeshop);

module.exports = router;
