const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");

router.get("/register", catchAsync(usersController.registerForm));
router.post("/register", catchAsync(usersController.submitRegister));

router.get("/login", catchAsync(usersController.loginForm));
router.post("/login", catchAsync(usersController.submitLogin));

// router.route("/logout").get(users.logout);

module.exports = router;
