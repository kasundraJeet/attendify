const { Sequelize } = require("sequelize");
const { db_host, db_user, db_password, db_name, db_port } = require("./index");
const logger = require("../utils/logger");


const sequelize = new Sequelize(db_name, db_user, db_password, {
  host: db_host,
  port: db_port,
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connected successfully.");
    await sequelize.sync({ alter: true });
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
