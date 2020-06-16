const express = require("express");
const app = express();
const covidApi = require("novelcovid");
const port = 8080;
const handlebars = require("express-handlebars");

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  handlebars({
    defaultView: "home",
    layoutsDir: __dirname + "/views/layouts",
  })
);

covidApi.countries().then(console.log);
app.get("/", function (req, res) {
  covidApi.countries().then((response) => {
    res.render("home", { info: response });
  });
});
app.listen(port, function () {
  console.log("listening ---> ", port);
});
