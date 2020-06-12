var mysql = require("mysql");
const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.use(bodyParser());
app.use(express.static(__dirname + "/public"));

var mysql = require("mysql");

var con = mysql.createConnection({
  //Configuration Object
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "sakila",
});

// var con=mysql.createConnection({
//   //Configuration Object
//   host: "localhost",
//   user:"root",

// });

con.connect(function (err) {
  if (err) {
    console.error("The error is  ---> " + err);
  }
  //   console.log("Connected to The Database");
  else {
    app.get("/", (req, res) => {
      console.log(req.query);
      queryHandler(req.query.name);
      res.render("index", { count: 0, name: "first name" });
    });

    app.get("/insert", (req, res) => {
      console.log(req.query);
      let count = queryHandler(req.query.name, true);
      res.render("index", { count: count, name: "first name" });
    });
  }
});

function getData() {}
// con.connect(function(err){
//   if(err){throw err}
//   console.log("Connected to The Database");
// })

//Creating A Database Connection

// con.connect(function(err){
//   if(err){throw err};
// //   var values=[
// //     ["nameA","addressA"],
// //     ["nameB","adressB"],
// //     ["namec","adressC"],
// //   ]
// //   var sql= "Insert into customer Values ?";
//   // var sql="Select * from customers where name='b'";
//   // var sql="Insert into customers(name,address) values('Hello','World')"
//   // var sql="Delete from customers where address='PlaceB'";
//   // var sql="Update customers set name='hello' where address='PlaceA'";

//   con.query(sql,[values],function(err,result){
//     if(err) throw error;
//     console.log(result);
//     console.log("Inserted Successfully");
//   })
// })

app.listen(8080, () => {
  console.log("listening ... 8080");
});

function queryHandler(values, flag) {
  let sql = "select count(*) as count from customers";
  let res ;
  con.query(sql, function (err, result) {
    if (err) throw error;
    console.log('result ---> ' + JSON.stringify(result));
    res = result[0].count;
    console.log(res);
    // console.log("Inserted Successfully");
  });
  if (flag) {
    let time = new Date().toISOString();
    sql =
      "Insert into customers (name, click_count, time) values ('" +
      values +
      "'," +
      1 +
      ",'" +
      time +
      "')";
    // console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  }

  // sql = ""
  console.log('return value ' + res);
  return res;
}
