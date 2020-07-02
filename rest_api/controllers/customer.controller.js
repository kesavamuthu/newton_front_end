const Customer = require("../models/customer.model");

exports.create = (req, res) => {
  if (req.body == {}) {
    res.status(400).send({
      message: "Details can't be empty",
    });
    return;
  }
  let customer = {};
  if (req.body) {
    customer = new Customer({
      email: req.body.email,
      name: req.body.name,
      active: req.body.active,
    });
  } else {
    customer = new Customer({
      email: req.email,
      name: req.name,
      active: req.active,
    });
  }
  console.log(req.body[0]);
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while creating customer",
      });
    else res.status(201).send(data);
  });
};

exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error occured while finding all customers",
      });
    else res.send(data);
    // console.log(data);
  });
};

exports.findOne = (req, res) => {
  //   console.log(req.params);
  if (!req.params.customerId) {
    res.status(400).send({
      message: 'details can"t be empty',
    });
    return;
  }
  Customer.findById(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind == "kind_not_found") {
        res.status(404).send({
          message: `Not found customer with id ${req.params.id}`,
        });
      } else {
        res.status(500).send({
          message: err.message || "Error occured while finding customers",
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // console.log("update");
  if (!req.body || !req.params.customerId) {
    res.status(400).send({
      message: "content can't be empty",
    });
  }
  Customer.updateById(req.params.customerId, req.body, (err, data) => {
    if (err) {
      if (err.kind == "kind_not_found")
        res.status(404).send({
          message: `Not found customer with id ${req.body.customerId}`,
        });
      else {
        res.status(500).send({
          message: `Error updating with customer id ${req.body.customerId}`,
        });
      }
      return;
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  if (!req.params.customerId) {
    res.status(400).send({
      message: "Id is mandatory to delete a customer",
    });
  }
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind == "kind_not_found") {
        res.status(404).send({
          message: `No customer existed with this Id ${req.params.customerId}`,
        });
      } else {
        res.status(500).send({
          message: `Couldn't delete customer with id ${req.params.customerId}`,
        });
      }
      return;
    }
    res.send({ message: "Customer deleted successfully" });
  });
};

exports.deleteAll = (req, res) => {
  Customer.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: "Some error occured while deleting all customers",
      });
      return;
    }
    res.send({
      message: "All customer details deleted successfully",
    });
  });
};

exports.createBulk = (req, res) => {
  if (req.body == {} || req.body.length < 2) {
    res.status(401).send({
      message:
        "It's for bulk upload only if you need small upload consider /customers",
    });
    return;
  }
  for (let i = 0; i < req.body.length; ++i) this.create(req.body[0], res);
};
// module.exports = Customer;
