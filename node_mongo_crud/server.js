const express = require("express");
// const constData = require("./constant").APP_CONST;
const env = require("dotenv").config();
let app = express();
const bodyParser = require("body-parser");
const mongoClient = require("mongodb");
let url = process.env.MONGO_URL;

app.use(bodyParser());

mongoClient
  .connect(url)
  .then(function (client) {
    console.log("connected successfully...");
    const db = client.db("demo_mongo");
    const quotes = db.collection("quotes");
    // quotes.insertOne({ name: "brut" });
    // console.log(constData)
    app.get("/", function (req, res) {
      db.collection("quotes")
        .find()
        .toArray()
        .then((result) => {
          //Show in index page
          console.log(result);
          res.render("index.handlebars", { result: result });
        })
        .catch((err) => {
          console.log(error);
        });
      res.sendFile(__dirname + "/index.html");
    });

    // app.get("/", function (req, res) {
    //   res.sendFile(__dirname + "/index.html");
    // });

    app.post("/quotes", function (req, res) {
      //   console.log(req.body);
      const { body } = req;
      quotes
        .insertOne(body)
        .then((result) => res.send("done" + result))
        .catch((err) => console.log(err));

      //   res.sendFile(__dirname + "/index.html");
    });

    // app.get('/click', functino)

    app.listen(3001, function () {
      console.log("listening --> " + 3001);
    });
  })
  .catch((err) => console.log(err));
