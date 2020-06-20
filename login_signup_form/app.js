const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoClient = require("mongodb");
const port = 8080;
const path = require("path");
const dbDetails = require("../constant");

app.use(bodyParser());

app.get("/", function (req, res) {
  //   res.render("./index.html");
  console.log(dbDetails.dbCredentials.mongodb_url);
  // console.log(dbDetails);
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/login", async function (req, res) {});

app.post("/register", async function (req, res) {});

app.listen(port, function () {
  console.log("listening port is ---- ", port);
});
