const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { isLoggedIn } = require("../middleware");

router.get("/register", usersController.registerForm);
router.post("/register", catchAsync(usersController.submitRegister));

router.get("/login", usersController.loginForm);
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  catchAsync(usersController.submitLogin)
);

// router.route("/logout").get(users.logout);

module.exports = router;
