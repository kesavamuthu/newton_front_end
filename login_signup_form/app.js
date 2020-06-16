const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoDb = require("mongodb");
const port = 8080;
const path = require("path");

app.use(bodyParser());

app.get("/", function (req, res) {
  //   res.render("./index.html");
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, function () {
  console.log("listening port is ---- ", port);
});
