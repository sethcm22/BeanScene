const express = require("express");
const router = express.Router();
const coffeeshops = require("../controllers/coffeeshops");

router.route("/").get(coffeeshops.index);

module.exports = router;
