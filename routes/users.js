const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.route("/register").get(usersController.registerForm);

router.route("/login").get(usersController.loginForm);

// router.route("/logout").get(users.logout);

module.exports = router;
