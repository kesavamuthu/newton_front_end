const expressJwt = require("express-jwt");
const config = require("../config/jwt.config.json");

module.exports = token;

function token() {
  const { secret } = config;
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: ["/authenticate"],
  });
}
