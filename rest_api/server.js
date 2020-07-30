const express = require("express");
const bodyParser = require("body-parser");
const { authenticate } = require("./authenticate");
const jwt = require("./helpers/token");
const errorHandler = require("./helpers/errorHandler");
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", function (req, res) {
  res.json({ hello: "what " });
});

app.post("/authenticate", function (req, res, next) {
  authenticate(req.body)
    .then((tok) => res.json({ tok }))
    .catch(next);
});

app.use(jwt());
require("./routes/customer.routes")(app);
require("./routes/customer.routes.upgraded")(app);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`listenting ---> ${port}`);
});
