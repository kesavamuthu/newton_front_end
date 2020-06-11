var mysql = require("mysql");
const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

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
    throw err;
  }
  //   console.log("Connected to The Database");
  else {
    app.get("/", (req, res) => {
      res.render("index",{count : 0});
    });
  }
});

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
