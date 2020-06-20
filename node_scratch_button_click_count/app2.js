var mysql = require("mysql");
const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
const port = 8080;
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

var mysql = require("mysql");

var con = mysql.createConnection({
  //Configuration Object
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "newton_school",
});

con.connect(function (err) {
  if (err) {
    console.error("The error is  ---> " + err);
  } else {
    app.get("/", (req, res) => {
      console.log(req.query);
      res.render("index", { count: 0, name: "first name" });
    });

    app.get("/insert", async (req, response) => {
      try {
        const count = await queryHandler(req.query, true);
        console.log("value us " + JSON.stringify(count));
        response.render("index", {
          count: count.count,
          name: count.name,
        });
      } catch (e) {
        console.error("error occured ", e);
        response.json({ error: "error occured" });
      }
      console.log("passed one");
    });
  }
});

function getData() {}
app.listen(port, () => {
  console.log("listening ... " + port);
});

function queryHandler({ name }, flag) {
  // let sql = "select count(*) as count from customers";
  let sql =
    "Insert into customers (name, click_count, time) values ( ?, ?, ? )";

  con.query(sql, [name, 1, new Date().toISOString()], function (err, result) {
    if (err) throw err;
    console.log("Inserted Successfully" + JSON.stringify(result));
  });
  if (flag) {
    sql = "select count(*) as count from customers where name = ?";
    return new Promise(function (resolve, reject) {
      con.query(sql, [name], function (err, result) {
        if (err) throw err;
        console.log("result----->", result, name);
        resolve({
          count: result[0].count,
          name,
        });
      });
    });
  }
}
