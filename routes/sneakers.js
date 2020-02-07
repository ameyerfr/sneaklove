const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

router.get("/:category", (req, res, next) => {

  const query = req.params.category === 'all' ? {} : {category : req.params.category}

  // Filter by ONE tag
  if (req.query.tag_id && typeof req.query.tag_id === "string") {
    query.id_tags = { $in: [ mongoose.Types.ObjectId(req.query.tag_id) ]}
  }

  // Filter by MULTIPLE tag
  if (req.query.tag_id && typeof req.query.tag_id === "object") {
    let inArr = []
    req.query.tag_id.forEach(tag_id => {inArr.push(mongoose.Types.ObjectId(tag_id))})
    query.id_tags = { $in: inArr }
  }

  Promise.all([Sneaker.find(query), Tag.find()])
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
    .then(sneaker => {
      res.render("one_product", {sneaker : sneaker})
    }).catch(next)
});

module.exports = router;
