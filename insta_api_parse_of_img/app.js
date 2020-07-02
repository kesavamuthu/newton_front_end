const express = require("express");
const path = require("path");
var app = express();
var bodyParser = require("body-parser");
let ejs = require("ejs");
const dbAndUrlFetcher = require("./dataFetchAndSave");
const port = 3001;

app.use(bodyParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.post("/store", async (req, res) => {
  let url = req.body["display-url"];
  console.log(url);
  url = url.indexOf("?") != -1 ? url : url + "?__a=1";
  await dbAndUrlFetcher
    .fetcher(url)
    .then((data) => dbAndUrlFetcher.urlSaver(data, url))
    .then((imgUrls) => {
      res.render("template", {
        favoriteThings: imgUrls,
      });
    })
    .catch((error) => console.log(error));
  res.send();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, (host) => {
  console.log(`listening -->  ${port}`);
});
