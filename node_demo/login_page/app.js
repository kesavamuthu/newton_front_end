const express = require("express");
const body = require("body-parser");
let app = express();
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  console.log(req.protocol);
  res.render("login");
});

app.get("/user/:id", function (req, res) {
  res.send("user " + req.params.id);
});

// app.post("/output", function (req, res, next) {
//   console.log(req.body);
// //   res.json(req.body);
// res.render("output", req.body);
// });
app.use(body.urlencoded({ extended: true }));
app.use("/output", (req, res) => {
  if (req.method == "GET") res.render("output", {quote: req.query});
  else {
    res.render("output", {quote : req.body});
    console.log(req.body);
  }
  console.log(req.query);
});

// var bodyParser = require('body-parser');

// app.post("/postcall",  (req,res) => {
//   console.log(req.body);
//   // res.render("output",  { quote: randomQuote, variable: "Hello" 
//   //   });
//     res.render("output", { quote: req.body, variable: "Hello" });

// //  res.status(200).send('got details');
// })

// app.route({
//   method: 'GET',
//   path: '/script.js',
//   handler: {
//     directory: {
//       path:    __dirname + '/public',
//       listing: false,
//       index:   false
//     }
//   }
// });

app.listen(8080, () => {
  console.log("listening ... 8080");
});
