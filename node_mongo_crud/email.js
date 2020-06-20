/*const nodemailer = require("nodemailer");
const mailConstData = require("./constant").APP_CONST;

const transporter = nodemailer.createTransport([
  {
    service: "gmail",
    auth: {
      user: mailConstData.email,
      pass: mailConstData.password,
    },
  },
]);

let mailOptions = {
  from: "kesavamuthu@gmail.com",
  to: "kesavamuth@gmail.com",
  subject: "node mail",
  text: "msg form node js",
};

transporter.sendMail(mailOptions, function (err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log("Email was sent successfully");
  }
});
*/

const nodemailer = require('nodemailer');
const mailConstData = require("./constant").APP_CONST;
//const ejs = require('ejs');
//const fs = require('fs');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mailConstData.email,
      pass: mailConstData.password,
    }
});

let mailOptions = {
    from: "kesavamuthu@gmail.com",
	to: "kesavamuth@gmail.com",
    subject: "node mail",
	text: "msg form node js"
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
