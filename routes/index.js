const express = require("express");
const router = express.Router();
const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res, next) => {
  Promise.all([Sneaker.find(), Tag.find()])
    .then(response => {
      res.render("products", {
        category : "collection",
        sneakers : response[0],
        tags : response[1]
      })
    }).catch(next)
});

router.get("/sneakers/:category", (req, res, next) => {
  Promise.all([Sneaker.find({category : req.params.category}), Tag.find()])
    .then(response => {
      res.render("products", {
        category : req.params.category,
        sneakers : response[0],
        tags : response[1]
      })
    }).catch(next)
});

router.get("/one-product/:id", (req, res, next) => {
  Sneaker.findById(req.params.id)
    .then(sneaker => {
      console.log(sneaker)
      res.render("one_product", {sneaker : sneaker})
    }).catch(next)
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
