const express = require('express');
const morgan = require('morgan');
const AppError = require('./AppError');
const app = express();

app.use(morgan('dev'));
app.use((req, res, next) => {
  req.requestTime = Date.now();
  return next();
})

const verify = (req, res, next) => {
  const {password} = req.query;
  if (password === 'chickennugget') {
    next();
  }
  throw new AppError('password required!', 418);
}

app.get("/", (req, res) => {
  console.log(`Time:${req.requestTime}`);
  res.send('Home page');
})

app.get("/dogs", (req, res) => {
  res.send('Woof');
})

app.get("/error", (req, res) => {
  chicken.fly();
})

app.get("/secret", verify, (req, res) => {
  res.send("you are here yay");
})

app.use((req, res) => {
  res.status(404).send("We do not do that here");
})

app.use((err, req, res, next) => {
  const { status = 418, message = "POZOR ERROR!" } = err
  res.status(status).send(message);
})

app.listen(3000, () => console.log("Running on port 3000"));
