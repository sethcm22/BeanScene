require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const path = require("path");
const ExpressError = require("./utils/ExpressError");

const coffeeshopRoutes = require("./routes/coffeeshops");
const userRoutes = require("./routes/users");

const dbUrl = process.env.DB_URL;
mongoose
  .connect(dbUrl, { dbName: "beanscene" })
  .then(() => {
    console.log("Mongo Connection Open");
  })
  .catch((err) => {
    console.log("Mongo Error");
    console.log(err);
  });

app.engine("ejs", ejsMate);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use("/coffeeshops", coffeeshopRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(status).render("./error", { err });
  console.log(err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
