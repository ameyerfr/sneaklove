const express = require("express");
const router  = new express.Router();
const multer = require("multer");
const protectRoute = require("./../middlewares/protectRoute.js");
const uploader = require("./../config/cloudinary.js");

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
      console.log(response[0])
      res.render("product_edit", {sneaker : response[0], tags : response[1]});
    }).catch(next)
});

router.post("/edit/:id", protectRoute, (req, res, next) => {
  Sneaker.findByIdAndUpdate(req.params.id, req.body)
    .then(sneakers => {
      req.flash("success", "Product successfully edited!");
      res.redirect("/manager/all");
    }).catch(next)
});

router.post("/new/product", protectRoute, uploader.single("image"), (req, res, next) => {

  // Get the image url from cloudinary & save it in the sneaker object
  if (req.file && req.file.url) {
    req.body.image = req.file.url;
  }

  Sneaker.create(req.body)
    .then(sneaker => {
      req.flash("success", "Product successfully created!");
      res.redirect("/manager/all");
    }).catch(next)
});

router.get("/delete/product/:id", protectRoute, (req, res, next) => {
  Sneaker.findByIdAndRemove(req.params.id)
    .then(sneaker => {
      req.flash("success", "Product successfully deleted!");
      res.redirect("/manager/all");
    }).catch(next)
});


module.exports = router;
