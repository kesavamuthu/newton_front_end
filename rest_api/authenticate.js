const { secret } = require("./config/jwt.config.json");
const jwt = require("jsonwebtoken");
// const sequelize = require("./models/db.seq");
const users = require("./models/customer.seq.model");
// const { DataTypes } = require("sequelize");

const authenticate = async ({ name, password }) => {
  //   await sequelize.connect();
  const user = await users.findOne({
    where: { name, password, active: true },
  });

  if (!user) throw TypeError("Username or password is incorrect");

  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });
  console.log(token);
  return token;
};

module.exports = {
  authenticate,
};
