const express = require('express');
const path = require('path');
const cors = require('cors');
const { sequelize } = require('./models');
const memberRouter = require('./routers/member');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const PORT = process.env.port || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/loginapi', memberRouter);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});