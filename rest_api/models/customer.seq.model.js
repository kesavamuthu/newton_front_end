const { DataTypes } = require("sequelize");
const sequelize = require("./db.seq");

const Customer = sequelize.define("Customer", {
  //Customer change to lowercase showing its not equal need to find reasons
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
});
// sequelize.connect("Hey sequelize");
Customer.save = async (email, name, password, active) => {
  await sequelize.sync(); //this also delete the data in table.
  const jane = await Customer.create({ email, name, password, active });
  return jane;
};

Customer.findById = async ({ customerId }, callback) => {
  try {
    var rs = await Customer.findAll({
      where: {
        id: customerId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    if (!rs.length) {
      callback("KIND_NOT_FOUND", null);
    } else callback(null, rs);
  } catch (e) {
    callback(e, null);
  }
};
// sequelize.sync();
module.exports = Customer;
