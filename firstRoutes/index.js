const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/orange", (req, res) => {
  res.send("get orange");
})

app.post("/orange", (req, res) => {
  const {meat, sidedish, seasoning} = req.body
  res.send(`Here is your ${meat} with ${sidedish} and ${seasoning}.`);
})

app.get("*", (req,res) => {
  res.send("<h1>Hello in rest file</h1>");
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
})
