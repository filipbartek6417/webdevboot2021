const express = require('express');
const app = express();
const session = require('express-session');

const sessionOpts = {secret: 'someEnvVariable', resave: false, saveUninitialized: false} // for deprecation warnings
app.use(session(sessionOpts));

app.get("/count", (req, res) => {
  (req.session.count) ? req.session.count += 1 : req.session.count = 1;
  res.send(`You have viewed this page ${req.session.count} times`);
})

app.get("/request", (req, res) => {
  const {username = 'Anonymous'} = req.query;
  req.session.username = username;
  res.send(req.session.username)
})

app.get('*', (req, res) => {
  res.send("Fallback page")
})

app.listen(3000, () => {
  console.log("Listening on 3000");
})
