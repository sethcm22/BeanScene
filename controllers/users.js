const User = require("../models/user");

module.exports.loginForm = (req, res) => {
  res.render("users/login");
};

module.exports.registerForm = (req, res) => {
  res.render("users/register");
};

module.exports.submitRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to the BeanScene");
    res.redirect("/coffeeshops");
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("register");
  }
};

module.exports.submitLogin = async (req, res) => {
  const { username } = req.body;
  req.flash("success", `Welcome Back ${username}`);
  res.redirect("./coffeeshops");
};
