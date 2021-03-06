const { secret } = require("./config/jwt.config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("./models/customer.seq.model");

const authenticate = async ({ name, password }) => {
  try {
    const user = await users.findOne({
      where: { name, active: true },
    });
    console.log(user);
    let res = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (!result) reject("Username or password is incorrect");

        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });
        console.log(token);
        resolve(token);
      });
    });
    if (res) return res;
  } catch (error) {
    throw TypeError(error);
  }
};

module.exports = {
  authenticate,
};
