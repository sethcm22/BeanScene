const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const { isLoggedIn, storeReturnTo } = require("../middleware");

router
  .route("/register")
  .get(usersController.registerForm)
  .post(catchAsync(usersController.submitRegister));

router
  .route("/login")
  .get(usersController.loginForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    catchAsync(usersController.submitLogin)
  );

router.get("/logout", usersController.logout);

// router.route("/logout").get(users.logout);

module.exports = router;
