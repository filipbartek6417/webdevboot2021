const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisismysecrey'));

app.get('/greet', (req, res) => {
  const {name = 'None'} = req.cookies;
  res.send(`Hey there, ${name}!`);
})

app.get('/setName', (req, res) => {
  res.cookie('name', 'bubo_banator');
  res.cookie('fruit', 'grenade_apple');
  res.send('cookie set');
})

app.get('/getCookie', (req, res) => {
  res.cookie('fruit', 'grape', {signed: true});
  res.send('signed cookie done')
})

app.get('/verifyCookie', (req, res) => {
  res.send(req.signedCookies);
})

app.listen(3000, () => {
  console.log("running");
})
