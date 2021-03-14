const express = require('express');
const morgan = require('morgan');
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
  res.send('Need a password')
}

app.get("/", (req, res) => {
  console.log(`Time:${req.requestTime}`);
  res.send('Home page');
})

app.get("/dogs", (req, res) => {
  res.send('Woof');
})

app.get("/secret", verify, (req, res) => {
  res.send("you are here yay");
})

app.use((req, res) => {
  res.status(404).send("We do not do that here");
})

app.listen(3000, () => console.log("Running on port 3000"));
