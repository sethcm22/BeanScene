const express = require("express");
const router = express.Router();
const coffeeshopsController = require("../controllers/coffeeshops");

router
  .route("/")
  .get(coffeeshopsController.index)
  .post(coffeeshopsController.createSubmit);

router.route("/create").get(coffeeshopsController.createForm);

router.route("/:id").get(coffeeshopsController.show);

module.exports = router;
