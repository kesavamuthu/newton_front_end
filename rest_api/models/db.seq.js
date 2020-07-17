const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql",
});
sequelize.connect = async function (val) {
  try {
    await sequelize.authenticate();
    console.log("Connected successfully", val);
    // await sequelize.close().then(console.log);
    // console.log("bye");
  } catch (error) {
    console.error("Unable to connect ", error);
  }
};

module.exports = sequelize;
