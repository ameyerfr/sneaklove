const express = require("express");
const router  = new express.Router();
const bcrypt  = require("bcryptjs");
const User = require("./../models/User");

router.get("/signup", (req, res) => {
  res.render("signup");

});

router.post("/signup", (req, res, next) => {
  const newUser = req.body;
  User
    .findOne({ email: newUser.email })
    .then(dbRes => {

      if (dbRes) {
        // TODO FLASH MESSAGES
        // req.flash("error", "sorry, email is already taken :/");
        return res.redirect("/auth/signup");
      }

      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))

      User.create(newUser, function(err, data){
        if (err) throw new Error('Error creating user');

        req.session.currentUser = data;
        res.redirect("/manager/all");
      })

    }).catch(next)

});

router.get("/signin", (req, res) => {
  res.render("signin");
});

module.exports = router;
