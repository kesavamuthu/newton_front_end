module.exports = (app) => {
  const customers = require("../controllers/customer.controller.upgraded");
  const mail = require("../controllers/mail.controller");
  app.post("/up/customers", customers.create);
  app.post("/up/bulk", customers.createBulk);
  app.get("/up/customers/", customers.findAll);
  app.get("/up/customers/:customerId", customers.findOne);
  app.put("/up/customers/:customerId", customers.update);
  app.delete("/up/customers/:customerId", customers.delete);
  app.delete("/up/customers/", customers.deleteAll);
  app.post("/send/mail", mail);
};
