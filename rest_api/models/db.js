const sql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = sql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
// dbConfig.newOne = "hai";
// console.log(dbConfig);
connection.connect((errro) => {
  if (errro) throw errro;
  console.log("connected successfully");
});

// Customer.getAll = function (result) {
//   sql.query("select * from customers", function (err, result) {
//     if (err) throw err;
//     result(null, err);
//     return;
//   });
// };

module.exports = connection;
