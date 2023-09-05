const express = require("express");
const router = express.Router();
const users = require("../controllers/users");

router.route("/register").get(users.registerForm);

router.route("/login").get(users.loginForm);

// router.route("/logout").get(users.logout);

module.exports = router;
