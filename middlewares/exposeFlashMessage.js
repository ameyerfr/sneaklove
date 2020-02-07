module.exports = function exposeFlashMessage(req, res, next) {
  console.log(req.flash("success"), req.flash("error"))
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
};
