const env = require("dotenv").config();
// const env = require("dotenv").config({
//   path: __dirname + "/dotenv/",
// });
const MONGO_URL = process.env.MONGO_DB_URL;
const mongoose = require("mongoose");

mongoose.connect(MONGO_URL, { useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});
const urlSchema = new mongoose.Schema({
  mainUrl: String,
  imageUrls: Array,
});

const instagramUrlSchema = mongoose.model("instagramUrlSchema", urlSchema);

function crud(type, mainUrl, imageUrls) {
  const current = new instagramUrlSchema({
    mainUrl,
    imageUrls,
  });

  const save = function () {
    current.save(function (error) {
      if (error) throw error;
      console.log("saved successfully");
    });
  };

  const findUsingMainUrl = function (callback) {
    instagramUrlSchema.find({ mainUrl }, callback);
  };

  if (type === "delete")
    instagramUrlSchema.deleteOne({ mainUrl }, () =>
      console.log(`Deleted successfully ${mainUrl} `)
    );

  if (type == "findAll") return instagramUrlSchema;
  if (type == "save") return save;
  else if (type == "find") return findUsingMainUrl;
}

module.exports = crud;
