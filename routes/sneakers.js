const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Sneaker = require("./../models/Sneaker");
const Tag = require("./../models/Tag");

router.get("/:category", (req, res, next) => {

  // All or men/women/kid
  const query = req.params.category === 'all' ? {} : {category : req.params.category}

  // URL Filter by ONE tag
  if (req.query.tag_id && typeof req.query.tag_id === "string") {
    query.id_tags = { $in: [ mongoose.Types.ObjectId(req.query.tag_id) ]}
  }

  // URL Filter by MULTIPLE tags
  if (req.query.tag_id && typeof req.query.tag_id === "object") {
    let inArr = []
    req.query.tag_id.forEach(tag_id => {inArr.push(mongoose.Types.ObjectId(tag_id))})
    query.id_tags = { $all: inArr }
  }

  Promise.all([Sneaker.find(query), Tag.find()])
    .then(response => {

      const responseObject = {
        category : req.params.category,
        sneakers : response[0],
        tags : response[1],
        scripts : ['sneakers']
      }

      if (req.query.ajax) {
        res.json(responseObject)
        return
      } else {
        res.render("products", responseObject)
      }

    }).catch(next)
});

router.get("/product/:id", (req, res, next) => {
  Sneaker.findById(req.params.id)
    .populate("id_tags")
    .then(sneaker => {
      res.render("one_product", { sneaker : sneaker, scripts : ['sneakers'] })
    }).catch(next)
});

module.exports = router;
