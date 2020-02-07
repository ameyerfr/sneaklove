const express = require("express");
const router  = new express.Router();
const bcrypt  = require("bcryptjs");
const User = require("./../models/User");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  const newUser = req.body;

  if (!newUser.email || !newUser.password) {
    req.flash("error", "Fill the form, dude !");
    return res.redirect("/auth/signup");
  }

  User
    .findOne({ email: newUser.email })
    .then(dbRes => {

      if (dbRes) {
        req.flash("error", "Sorry, email is already taken :/");
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

router.post("/signin", (req, res, next) => {
  User
    .findOne({ email: req.body.email })
    .then(dbRes => {

      if(!dbRes) {
        req.flash("error", "Wrong credentials man...");
        res.redirect("/auth/signin");
        return;
      }

      if (bcrypt.compareSync(req.body.password, dbRes.password)) {
        delete dbRes.password;
        req.session.currentUser = dbRes;
        res.redirect("/manager/all");
      } else {
        // Wrong password
        req.flash("error", "Wrong credentials man...");
        res.redirect("/auth/signin");
      }

    }).catch(next)
});

router.get("/logout", (req, res, next) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    })
  } catch(error) {
    console.log("Error logging out : ", error);
    res.redirect("/");
  }
});

module.exports = router;
