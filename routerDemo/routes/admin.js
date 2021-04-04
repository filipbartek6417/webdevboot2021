const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) next();
  res.send("authenticate pls");
})

router.get("/", (req, res) => {
  res.send("admin side")
})

router.post("/", (req, res) => {
  res.send("deleted admin side")
})

module.exports = router;
