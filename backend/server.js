const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const { sequelize } = require('./models');
//const memberRouter = require('./routers/member');
const LoiginRouter = require('./routers/login');
const writeRouter = require('./routers/write');
const signUpRouter = require('./routers/signUp');
const articleRouter = require('./routers/article');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret:"secretcode",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/loginapi', LoiginRouter);
//app.use('/loginapi', memberRouter);
app.use('/writeapi', writeRouter);
app.use('/signupapi', signUpRouter);
app.use('/articleapi', articleRouter);

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