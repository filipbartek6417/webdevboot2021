const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
  res.send("all dogs")
})
router.post("/", (req, res) => {
  res.send("create a dog")
})
router.get("/:id", (req, res) => {
  res.send("one dog")
})
router.get("/:id/edit", (req, res) => {
  res.send("edit a dog")
})

module.exports = router;
