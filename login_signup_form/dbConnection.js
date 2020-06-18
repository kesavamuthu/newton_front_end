// const mongoClient = require("mongodb");
const dbDetails = require("../constant");
const mongoose = require("mongoose");

mongoose.connect(
  dbDetails.dbCredentials.mongodb_url,
  { useNewUrlParser: true },
  function (error) {
    if (error) throw error;
    console.log("connected successfully ");
  }
);
// const db = mongoose.connection;
const kittySchema = new mongoose.Schema({
  name: String,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model("Kitten", kittySchema);
// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// });
const schema = mongoose.schema;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

function insert() {
  for (let i = 0; i < 10; ++i) {
    db.once("open", async function () {
      const fluffy = new Kitten({ name: "qwert" + i });
      // fluffy.speak(); // "Meow name is fluffy"
      await fluffy.save(function (err, fluffy) {
        if (err) return console.error(err);
        fluffy.speak();
      });
    });
    //   db.close;
  }

  return new Promise(function (resolve, reject) {
    return resolve();
  });
}
// Kitten.find({ name: /^fluff/ }, function (error, res) {
//   console.log("Result set ", res);
// });

exports.kittensInsert = function () {
  return new Promise(function (resolve, reject) {
    const kesav = [];
    for (let i = 0; i < 10; ++i) {
      const fluffy = new Kitten({ name: "qwert" + i });
      kesav.push(fluffy);
    }
    db.collection("kittens")
      .insert(kesav)
      .then(function (obj) {
        resolve(obj);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

const a = kittensInsert;
if (a) {
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log("result from db ", kittens);
  });
}
