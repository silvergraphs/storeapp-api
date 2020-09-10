const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/Users");
const CategoryModel = require("./models/Categories");
const ApplicationModel = require("./models/Applications");

// Database connection settings
const dbData = {
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "store",
};

const sequelize = new Sequelize(dbData.database, dbData.user, dbData.password, {
  host: dbData.host,
  port: dbData.port,
  dialect: "mysql",
  logging: console.log,
});

const User = UserModel(sequelize, Sequelize);
const Category = CategoryModel(sequelize, Sequelize);
const Application = ApplicationModel(sequelize, Sequelize);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("[StoreApp-DB] Connected to database.");
    await sequelize.sync();
    console.log("[StoreApp-DB] All models were synchronized successfully.\n");
  } catch (error) {
    console.error(
      "[StoreApp-DB] Unable to connect to the database " +
        error.original.address +
        ":" +
        error.original.port +
        " -",
      error.original.errno
    );
  }
}

module.exports = {
  testConnection,
  User,
  Category,
  Application,
};
