const express = require('express');
const connectDB = require('./configs/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port } = require('./configs');
const { authRouter } = require('./src/routers');

console.log("hii")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

connectDB();

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
