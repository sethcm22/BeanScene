const express = require("express");
const router = express.Router();
const coffeeshopsController = require("../controllers/coffeeshops");
const catchAsync = require("../utils/catchAsync");
const { validateCoffeeshop } = require("../validationSchema");
const { isLoggedIn } = require("../middleware");

router
  .route("/")
  .get(catchAsync(coffeeshopsController.index))
  .post(
    isLoggedIn,
    validateCoffeeshop,
    catchAsync(coffeeshopsController.submitCreateForm)
  );

router.route("/create").get(isLoggedIn, coffeeshopsController.renderCreateForm);

router
  .route("/:id")
  .get(catchAsync(coffeeshopsController.showCoffeeshop))
  .put(validateCoffeeshop, catchAsync(coffeeshopsController.submitEditForm))
  .delete(isLoggedIn, catchAsync(coffeeshopsController.deleteCoffeeshop));

router
  .route("/:id/edit")
  .get(isLoggedIn, catchAsync(coffeeshopsController.renderEditCoffeeshop));

module.exports = router;
