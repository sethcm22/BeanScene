const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const passport = require("passport");
// const path = require("path");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
// app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
