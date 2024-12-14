require('dotenv').config();

module.exports = {
  rabbit_url: process.env.RABBITMQ_URI,
  node_email: process.env.EMAIL_USER,
  node_pass: process.env.EMAIL_PASS
};
