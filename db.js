const { Sequelize, DataTypes } = require("sequelize");

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
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("[StoreApp-DB] Connected to database.");
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
};
