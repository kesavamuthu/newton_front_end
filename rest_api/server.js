const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.json({ hello: "what the fuck" });
});

require("./routes/customer.routes")(app);
require("./routes/customer.routes.upgraded")(app);
app.listen(port, () => {
  console.log(`listenting ---> ${port}`);
});
