module.exports = (app) => {
  const customers = require("../controllers/customer.controller");

  app.post("/customers", customers.create);
  app.post("/customers/bulk", customers.createBulk);
  app.get("/customers", customers.findAll);
  app.get("/customers/:customerId", customers.findOne);
  app.put("/customers/:customerId", customers.update);
  app.delete("/customers/:customerId", customers.delete);
  app.delete("/customers", customers.deleteAll);
};
