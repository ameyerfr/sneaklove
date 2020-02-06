const express = require("express");
const router  = new express.Router();
const protectRoute = require("./../middlewares/protectRoute.js");

const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

router.get("/all", protectRoute, (req, res, next) => {
  Sneaker.find()
    .then(sneakers => {
      res.render("products_manage", {sneakers : sneakers});
    }).catch(next)
});

router.get("/new", protectRoute, (req, res, next) => {
  Tag.find()
    .then(tags => {
      res.render("products_add", {tags : tags});
    }).catch(next)
});

router.get("/edit/:id", protectRoute, (req, res, next) => {
  Promise.all([Sneaker.findById(req.params.id), Tag.find()])
    .then(response => {
      res.render("product_edit", {sneaker : response[0], tags : response[1]});
    }).catch(next)
});

router.post("/edit/:id", protectRoute, (req, res, next) => {
  Sneaker.findByIdAndUpdate(req.params.id, req.body)
    .then(sneakers => {
      res.redirect("/manager/all");
    }).catch(next)
});

router.post("/new/product", protectRoute, (req, res, next) => {
  Sneaker.create(req.body)
    .then(sneaker => {
      res.redirect("/manager/all");
    }).catch(next)
});

router.get("/delete/product/:id", protectRoute, (req, res, next) => {
  Sneaker.findByIdAndRemove(req.params.id)
    .then(sneaker => {
      res.redirect("/manager/all");
    }).catch(next)
});


module.exports = router;
