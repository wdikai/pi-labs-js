var express = require('express');
var User = require('../models/userModel');
var Users = require('../models/usersModel');
var router = express.Router();

router.get('/login', loginView);

router.post('/login', login);

router.get('/logout', logout);

module.exports = router;

function loginView(req, res) {
	if(req.session.login)	{
		res.redirect('/');
	}

	res.render('login');
};

function login(req, res) {
	var login = req.body['login'];
	var password = req.body['password'];
	
	var hasLogin = Users.get().check(login) != -1;
	var hasUser = User.hasUser(login, password);
	
	if(hasLogin && hasUser){
		req.session.login = login;
	}

	res.redirect('/');
};

function logout(req, res) {
	req.session.destroy(function(err) {
		if(err){
			console.log(err);
		}
	});
	res.redirect('/');
}