const express = require("express");
const router  = new express.Router();
const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

router.get("/all", (req, res, next) => {
  Sneaker.find()
    .then(sneakers => {
      res.render("products_manage", {sneakers : sneakers});
    }).catch(next)
});

router.get("/edit/:id", (req, res, next) => {
  Promise.all([Sneaker.findById(req.params.id), Tag.find()])
    .then(response => {
      res.render("product_edit", {sneaker : response[0], tags : response[1]});
    }).catch(next)
});

router.post("/edit/:id", (req, res, next) => {
  Sneaker.findByIdAndUpdate(req.params.id, req.body)
    .then(sneakers => {
      res.redirect("/manager/all");
    }).catch(next)
});



module.exports = router;
