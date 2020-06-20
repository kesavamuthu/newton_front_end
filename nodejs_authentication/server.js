const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const app = express();
const port = 8080;

const users = [];



const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => )
)
app.set("view-engine", "ejs");
app.use(bodyParser());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride("_method"));

app.get("/", checkAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.body.username });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("index.ejs", { name: req.body.username });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { name: "hai" });
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { name: "hai" });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.post("/register", async (req, res) => {
  try {
    let hashPwd = await bcrypt.hash(req.body.password, 10);
    let { name, email } = req.body;
    users.push({
      name,
      email,
      password: hashPwd,
    });
    console.log(users);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
});

app.listen(port, () => {
  console.log("listening -- ", port);
});
