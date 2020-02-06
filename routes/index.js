const express = require("express");
const router = express.Router();
const Sneaker = require("./../models/Sneaker");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res, next) => {
  Sneaker.find()
    .then(sneakers => {
      console.log(sneakers)
      res.render("products", {
        category : "collection",
        sneakers : sneakers,
        tags : [{_id:1,label:"hiking"},{_id:2,label:"running"}]
      })
    }).catch(next)

});

router.get("/sneakers/:cat", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
