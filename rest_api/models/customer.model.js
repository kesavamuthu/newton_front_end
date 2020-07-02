const sql = require("./db");
const e = require("express");

const Customer = function (customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
  sql.query("Insert into customers set ? ", newCustomer, (err, res) => {
    if (err) {
      console.error("error : ", err);
      result(err, null);
      return;
    }
    console.log("Created customer ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = function (customerId, result) {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.error("error : ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("customer found ", ...res);
      result(null, res[0]);
      return;
    }
    result("kind_not_found", null);
  });
};

Customer.getAll = (result) => {
  sql.query("Select * from customers", (err, res) => {
    if (err) {
      console.error("error : ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  // console.log(id, customer);
  sql.query(
    "update customers set email = ?, name = ?, active = ? where id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.error("error : ", err);
        result(err, null);
        return;
      }
      if (!res.affectedRows) {
        result("kind_not_found", null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = function (id, result) {
  sql.query(`delete from customers where id=${id}`, (err, res) => {
    if (err) {
      console.error("Error : ", err);
      result(null, err);
      return;
    }
    if (!res.affectedRows) {
      result({ kind: "kind_not_found" }, null);
      return;
    }

    console.log(`Deleted customer with id ${id}`);
    result(null, res);
  });
};

Customer.removeAll = function (result) {
  sql.query("delete from customers", (err, res) => {
    if (err) {
      console.error("Error while deleting all details ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers `);
    result(null, res);
  });
};

module.exports = Customer;
