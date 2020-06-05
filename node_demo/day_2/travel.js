var express = require("express");
var app = express();

/****************using handle bar template engine no need to create a required layout again and again haha............................................................ */
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  let quotes = "abcdefgh".split("");
  // console.log(quotes);
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.render("about", { quote: randomQuote, variable: "Hello" });
});
/************************---------------End of templates   *******************************/
/************************---------------start routning --------------------------------------------------------------------------------------- */
// app.set("port", 8080);
// app.get("/", function (req, res) {
//   res.type("text/plain");
//   res.send("Homepage Route");
// });

// app.get("/about*", function (req, res) {
//   res.type("text/plain");
//   res.send("About Route");
// });
// app.use("/", function (req, res) {
//   res.send("Page Not Found");
// });

// app.get("/about/other", function (req, res) {
//   res.type("text/plain");
//   res.send("Other Route");
// });

// app.use(function(req,res){
//   res.type("text/plain");
//   res.status(404);
//   res.send("Page Not Found");
// })

app.listen(8080, () => {
  console.log("Listening");
});
