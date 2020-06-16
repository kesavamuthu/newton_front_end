let mongoClient = require("mongodb").MongoClient;

let url =
  "mongodb+srv://demo:WE5Vydrar3Erys.@cluster0-tygzu.mongodb.net/node_with_mongo?retryWrites=true&w=majority";

mongoClient.connect(url, function (err, res) {
  if (err) throw error;
  console.log("db connected");
  let dbo = res.db("demo_mongo");
  var myObj = { name: "what", age: 25 };
  /**********************used to create collections********************************* */

  //   dbo.createCollection("customers", function (err, res) {
  //     if (err) throw error;
  //     console.log("collection is also created");
  //   });
  /******************End************************************* */

  /***************************Insert one and many ********************** */
  //   dbo.collection("customers").insertOne(myObj, function(err, res){
  //     if(err) throw error;
  //     console.log("record inserted");
  //     //
  //   })
  //   dbo.collection("customers").insertMany([
  //     { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
  //     { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
  //     { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
  //     { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
  //     { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
  //  ]);
  /******************End************************************* */

  dbo
    .collection("customers")
    .find({},{
        projection:{
            name: "planner"
        }
    })
    .toArray(function (err, res) {
      if (err) throw error;
      res.forEach((ele) => {
        for (var t in ele)
        //   if (t instanceof Object)
           console.log(t + " ------> " + ele[t]);
        //   else if(Array.isArray(ele[t])) ele[t].forEach((pass) => console.log(pass));
      });
    });
  res.close();
});
