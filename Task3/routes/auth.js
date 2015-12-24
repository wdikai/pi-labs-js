var express = require('express');
var auth = require('../controllers/authController');
var router = express.Router();

router.get('/login' , function (req, res) {
	res.render('login');
});

router.post('/login' , function (req, res) {
	auth.login(req, res);
});

router.get('/logout' , function (req, res) {
	auth.logout(req, res);
});

module.exports = router;
