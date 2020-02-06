const express = require("express");
const router  = new express.Router();
const bcrypt  = require("bcryptjs");

router.get("/signup", (req, res) => {
  res.render("signup");
  // res.send("sneak");
  // req.session.msg
});

router.get("/signin", (req, res) => {
  res.send("love");
});

module.exports = router;
