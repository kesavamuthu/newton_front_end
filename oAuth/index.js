const express = require("express");
let app = express();
const bodyParser = require("body-parser");
let cookieSession = require("cookie-session");
var GoogleStrategy = require("passport-google-oauth2").Strategy;
const env = require("dotenv").config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var passport = require("passport");
//passport
require("./google-passport-config");
app.set("view-engine", "ejs");

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.render("index.ejs");
});

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      return cb(null, profile);
    }
  )
);

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  function (req, res) {
    // res.redirect("/");
    // console.log(profile);
    // console.log(req.body);
    res.render("index.ejs");
    console.log("done");
  }
);

app.listen(3000, () => {
  console.log("listening ", 3000);
});
