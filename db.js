const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});
const User = sequelize.define("User", {
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const connect = async () => {
  sequelize
    .authenticate()
    .then(async () => {
      await User.sync({ alter: true });
      console.log("table is created");
    })
    .catch((e) => console.error(e));
};

module.exports = { connect, User };
