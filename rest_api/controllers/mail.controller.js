const mailer = require("nodemailer");
const { secret } = require("../config/jwt.config.json");
const jwt = require("express-jwt");
const users = require("../models/customer.seq.model");
const crypto = require("crypto"),
  algorithm = "aes-256-ctr";
const dotenv = require("dotenv").config();
const password = process.env.password;

function decrypt(text) {
  console.log(algorithm, password);
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

const send = async (req, res) => {
  // if (req.headers && req.headers.authorization) {
  //   var authorization = req.headers.authorization.split(" ")[1],
  //     decoded;
  //   console.log(authorization);
  //   try {
  //     decoded = jwt.verify(authorization, secret);
  //     console.log(decoded);
  //   } catch (e) {
  //     console.error(e);
  //     return res.status(401).send("unauthorized");
  //   }
  //   var userId = decoded.id;
  //   console.log(userId);
  //   // User.findOne({_id: userId}).then(function(user){
  //   //     // Do something with the user
  //   //     return res.send(200);
  //   // });
  // }
  // return res.send(500);
  console.log(process.env.algorithm, process.env.password);
  let { mail } = req.body;
  let out = "";
  if (Array.isArray(mail)) mail.forEach((e) => (out += e + ","));
  else out = mail;

  let senderDetails = await users.findOne({ where: { id: 1 } });
  console.log(senderDetails);
  let transporter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: senderDetails.email,
      pass: decrypt(senderDetails.password),
    },
  });
  console.log(out);
  var mailOptions = {
    from: senderDetails.email,
    to: out,
    subject: "Github repo details",
    text:
      "https://github.com/kesavamuthu/newton_front_end/tree/master/rest_api \n Don't forget to hit stars...",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(400).send({ message: 'Mail din"t send' });
    } else {
      console.log("Email sent: " + info.response);
      res.status(201).send({ message: "done" });
    }
  });
};

module.exports = send;
