const express = require("express");
const router = express.Router();
const coffeeshopsController = require("../controllers/coffeeshops");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isOwner, validateCoffeeshop } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(catchAsync(coffeeshopsController.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCoffeeshop,
    catchAsync(coffeeshopsController.submitCreateForm)
  );

router.route("/create").get(isLoggedIn, coffeeshopsController.renderCreateForm);

router
  .route("/:id")
  .get(catchAsync(coffeeshopsController.showCoffeeshop))
  .put(
    isOwner,
    upload.array("image"),
    validateCoffeeshop,
    catchAsync(coffeeshopsController.submitEditForm)
  )
  .delete(
    isLoggedIn,
    isOwner,
    catchAsync(coffeeshopsController.deleteCoffeeshop)
  );

router
  .route("/:id/edit")
  .get(
    isLoggedIn,
    isOwner,
    catchAsync(coffeeshopsController.renderEditCoffeeshop)
  );

module.exports = router;
