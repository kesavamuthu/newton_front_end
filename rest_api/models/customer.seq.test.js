const Customer = require("./customer.seq.model");
const sequelize = require("./db.seq");
const { Op } = require("sequelize");
console.log(Customer);
Customer.save("lsdld@lksdflkfsd", "qwerty").then(async (val) => {
  console.log(val.toJSON());
  val.name = "brongi";
  await val.save();
  console.log(val.toJSON());
});

(async () => {
  let custs = await Customer.findAll({
    where: {
      [Op.and]: [
        { name: "qwerty" },
        {
          id: {
            [Op.lt]: 8,
          },
        },
      ],
    },
  });
  //   custs.every((customer) => console.log(customer.toJSON()));
  custs.forEach((customer) => console.log(customer.toJSON()));
})();

Customer.findAll({
  group: ["id"],
  attributes: ["id", sequelize.fn("count", sequelize.col("id")), "id"],
}).then(function (tags) {
  console.log(tags.length);
});

Customer.findAll({
  where: {
    id: 123,
  },
}).then(function (tags) {
  console.log(tags);
});
