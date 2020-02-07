module.exports = function exposeFlashMessage(req, res, next) {
    res.locals.status = req.flash("error") ? 'error' : 'success';
    res.locals.msg = req.flash("error") ? req.flash("error") : req.flash("success");
    console.log(res.locals.status, res.locals.msg);
    next();
  };