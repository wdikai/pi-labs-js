var User = require('../models/userModel');
var Users = require('../models/usersModel');

module.exports = {
	isLogin: function ( req, res, next) {
		var login = req.session.login;
		if (!login) {
			res.redirect('/auth/login');
		} else {
			req.login = login;
			next();
		}
	},
	loadUserIfPermission: function (req, res, next){
		var currentEditedLogin = req.params['login'];
		if(currentEditedLogin && Users.get().check(currentEditedLogin) !== -1){
			var myLogin = req.session.login;
			var isMe = (myLogin === currentEditedLogin);
			
			var user = User.getUser(currentEditedLogin);
			var me = User.getUser(myLogin);
	
			if(me.role === 'admin' || isMe){
				req.user = user;
			}
		}
	
		next();
	},
	isAdmin: function (req, res, next) {
		var login = req.session.login;
		var user = User.getUser(login);
		if (user.role === 'admin') {
			next();
		} else {
			res.redirect('/');
		}
	}
};