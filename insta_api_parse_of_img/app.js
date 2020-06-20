const express = require("express");
var app = express();
var bodyParser = require("body-parser");
let ejs = require("ejs");
const https = require("https");
// const handlebars = require("express-handlebars").create({
//   defaultLayout: "main",
// });
const port = 3001;
app.use(bodyParser());
app.set("view engine", "ejs");

app.post("/store", async (req, res) => {
  //   res.render('index', {foo: 'FOO'});
  let url = req.body["display-url"];
  console.log(url);
  await fetcher(url);
  res.sendFile(__dirname + "/index.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/", function (req, res) {
  //   ejs ./template_file.ejs -f data_file.json -o ./output.html;
  let people = ["geddy", "neil", "alex"];
  let html = ejs.render('<h1><%= people.join(", "); %><h1>', {
    people: people,
  });

  res.send(html);
  //   res.sendFile(__dirname + "/index.html");
});

app.listen(port, (host) => {
  console.log(`${host}: ${port}`);
});

function fetcher(url) {
  url = url.indexOf("?") != -1 ? url : url + "?__a=1";
  console.log("----------> ", url);
//   url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
  https
    .get(url, (resp) => {
      let data = "";

      // A chunk of data has been recieved.
      resp.on("data", (chunk) => {
        data += chunk;
        
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(escape(data));
        console.log(JSON.parse(data));
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
}
