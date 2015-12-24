function checkUser ( req, res, next) {
  var login = req.session.login;
  if (!login) {
    res.redirect('/auth/login');
  } else {
    req.login = login;
    next();
  }
}

module.exports = checkUser;