// app.js
const fastify = require("fastify")({ logger: false }); // We'll use our custom logger
const dotenv = require("dotenv");
const { connectDB } = require("./configs/database");
const employeeRoutes = require("./src/routers/employeeRouter");
const logger = require("./utils/logger");

// Load environment variables
dotenv.config();

// Register routes
fastify.register(employeeRoutes);

// Global Error Handler
fastify.setErrorHandler(function (error, request, reply) {
  logger.error(`Unhandled Error: ${error.message}`);
  reply.status(500).send({
    status: "error",
    message: "Internal Server Error",
  });
});

// Start the server
const start = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    await fastify.listen(PORT, "0.0.0.0");
    logger.info(`Server is running on port ${PORT}`);
  } catch (err) {
    logger.error(`Server Start Error: ${err.message}`);
    process.exit(1);
  }
};

start();
