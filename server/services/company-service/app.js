const express = require("express");
const connectDB = require("./configs/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const { port } = require("./configs");
const multer = require("multer");
const { authRouter } = require("./src/routers");
const { notFoundResponse } = require("./utils/responseHandlers");

const app = express();

const upload = multer();
app.use(upload.none());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

connectDB();

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use((req, res, next) => {
  notFoundResponse(res, "Route not found");
});

const PORT = port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
