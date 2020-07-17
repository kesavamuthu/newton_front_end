const Customer = require("../models/customer.seq.model");
const { json } = require("body-parser");

exports.create = (req, res) => {
  if (JSON.stringify(req.body) == "{}") {
    res.status(400).send({
      message: "Details can't be empty",
    });
    return;
  }
  if (req.body) {
    var { email, name, active } = req.body;
  } else {
    var { email, name, active } = req;
  }
  Customer.save(email, name, active)
    .then(() => res.status(201).send("done"))
    .catch((error) => {
      console.error(error);
      res.status(304).send();
    });
};

exports.findAll = async (req, res) => {
  try {
    var rs = await Customer.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send(JSON.stringify(rs));
  } catch (e) {
    console.error(e);
    console.error(rs);
    res.status(500).send({
      message: e || "Error occured while finding all customers",
    });
  }
};

exports.findOne = async (req, res) => {
  if (!req.params.customerId) {
    res.status(400).send({
      message: 'details can"t be empty',
    });
    return;
  }
  Customer.findById(req.params, function (error, result) {
    if (error) {
      if (error == "KIND_NOT_FOUND") {
        res.status(404).send({
          message: `Not found customer with id ${req.params.customerId}`,
        });
      } else {
        res.status(500).send({
          message: error || "Error occured while finding customers",
        });
      }
      return;
    }
    res.status(200).send(result);
  });
};

exports.update = (req, res) => {
  if (!req.body || !req.params.customerId) {
    res.status(400).send({
      message: "content can't be empty",
    });
  }
  const { name, email, active } = req.body;
  console.log(req.body);
  try {
    Customer.update(
      { name, email, active },
      {
        where: {
          id: req.params.customerId,
        },
      }
    ).then((val) => genericResForRUD("update ", val, res));
  } catch (e) {
    console.error(e);
    res.status(500).send({
      message: `Error updating customer with id ${req.params.customerId}`,
    });
  }
};

exports.delete = (req, res) => {
  if (!req.params.customerId) {
    res.status(400).send({
      message: "Id is mandatory to delete a customer",
    });
  }
  console.log(req.params.customerId);
  try {
    Customer.destroy({
      where: {
        id: req.params.customerId,
      },
    }).then((val) => genericResForRUD("delete", val, res));
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "some error happenend not able to delete",
    });
  }
};

exports.deleteAll = (req, res) => {
  Customer.destroy({
    truncate: true,
  })
    .then((val) => genericResForRUD("Deleted all ", !val, res))
    .catch((e) => {
      console.error(e);
      res.status(500).send({
        message: "Not able to crush all the data ",
      });
    });
};

exports.createBulk = async (req, res) => {
  if (req.body == {} || req.body.length < 2) {
    res.status(401).send({
      message:
        "It's for bulk upload only if you need small upload consider /customers",
    });
    return;
  }
  try {
    let arr = req.body;
    let result = await Customer.bulkCreate([...arr]);
    genericResForRUD("bulk creation", result.length, res);
  } catch (error) {
    res.status(500).send({
      message: "Bulk upload not happened because of some error ",
    });
  }
};

const genericResForRUD = (operation, val, res) => {
  console.log(val);
  val = Array.isArray(val) ? val[0] : val;
  res.status(val ? 200 : 404).send({
    message: `${operation} ${
      val ? "successfully " + val + " record" : "failed"
    }`,
  });
};
