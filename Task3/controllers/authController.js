var Users = require('../models/usersModel');
var users = new Users.Create();

module.exports = {
	login: function(req, res){
		var login = req.body['login'];
		var password = req.body['password'];
		if(users.load().valid(login, password)){
			req.session.login = login;
			res.redirect('/');
		} else {
			res.redirect('/auth/login');
		}
	},
	logout: function(req, res){
		req.session.destroy(function(err){
			
		});
		res.redirect('/');
	}
};