const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs')
const adminRoutes = require('./routes/admin');

app.use("/shelters", shelterRoutes);
app.use("/dogs", dogRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Home page");
})

app.get("*", (req, res) => {
  res.send("Oops, something went wrong");
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
})
