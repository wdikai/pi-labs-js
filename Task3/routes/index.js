var express = require('express');
var checkUser = require('../filters/checkUserFilter');
var router = express.Router();

router.get('/', checkUser, function(req, res) {
  res.render('index', {name: req.session.login});
});

module.exports = router;
