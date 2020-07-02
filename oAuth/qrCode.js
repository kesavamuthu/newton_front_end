let qrCode = require("qrcode");

qrCode.toString(
  "I am a pony!ljsdfkl",
  { type: "terminal", version: 2 },
  function (err, url) {
    console.log(url);
  }
);
