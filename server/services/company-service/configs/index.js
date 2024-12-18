require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  db_url: process.env.MONGO_URI,
  rabbit_url: process.env.RABBITMQ_URI,
  jwt_token: process.env.JWT_SECRET,
};
