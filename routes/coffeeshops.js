const express = require("express");
const router = express.Router();
const coffeeshopsController = require("../controllers/coffeeshops");
const catchAsync = require("../utils/catchAsync");

router
  .route("/")
  .get(catchAsync(coffeeshopsController.index))
  .post(catchAsync(coffeeshopsController.submitCreateForm));

router.route("/create").get(coffeeshopsController.renderCreateForm);

router
  .route("/:id")
  .get(catchAsync(coffeeshopsController.showCoffeeshop))
  .put(catchAsync(coffeeshopsController.submitEditForm))
  .delete(catchAsync(coffeeshopsController.deleteCoffeeshop));

router
  .route("/:id/edit")
  .get(catchAsync(coffeeshopsController.renderEditCoffeeshop));

module.exports = router;
