const express = require("express");
const router = express.Router();
const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

router.get("/collection", (req, res, next) => {
  Promise.all([Sneaker.find(), Tag.find()])
    .then(response => {
      res.render("products", {
        category : "collection",
        sneakers : response[0],
        tags : response[1]
      })
    }).catch(next)
});

router.get("/:category", (req, res, next) => {
  Promise.all([Sneaker.find({category : req.params.category}), Tag.find()])
    .then(response => {
      res.render("products", {
        category : req.params.category,
        sneakers : response[0],
        tags : response[1]
      })
    }).catch(next)
});

router.get("/product/:id", (req, res, next) => {
  Sneaker.findById(req.params.id)
    .populate("id_tags")
    .then(sneaker => {
      res.render("one_product", {sneaker: sneaker})
    }).catch(next)
});

module.exports = router;
