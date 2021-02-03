const express = require('express');
const app = express();

app.get("/", (req, res) => {
  res.send("Homepage")
})

app.get("/dogs/:breed", (req, res) => {
  const {breed} = req.params;
  res.send(`Browsing the ${breed} subpage.`);
})

app.get("/search", (req, res) => {
  const {q} = req.query;
  if(!q){
    res.send(`You ain't searching nothin'`);
  }
  res.send(`<h1>Search for: ${q}</h1>`);
})

app.get("/dogs", (req, res) => {
  res.send("Dogspage")
})

app.get("*", (req, res) => {
  res.send("Something such is non existant")
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
})
