var express = require('express');
var User = require('../models/userModel');
var Users = require('../models/usersModel');
var usrUtil = require('../helpers/user-util');
var UserClass = User.User;
var router = express.Router();

router.get('/', usrUtil.isLogin, listView);
router.get('/add', [usrUtil.isLogin, usrUtil.isAdmin], createView);
router.post('/add', [usrUtil.isLogin, usrUtil.isAdmin], create);
router.get('/:login/edit', [usrUtil.isLogin, usrUtil.loadUserIfPermission], updateView);
router.post('/:login/edit', [usrUtil.isLogin, usrUtil.loadUserIfPermission], update);
router.get('/:login/drop', [usrUtil.isLogin, usrUtil.isAdmin], dropView);
router.post('/:login/drop', [usrUtil.isLogin, usrUtil.isAdmin], drop);

module.exports = router;

function listView(req, res) {
	var login = req.session.login;
	var user = User.getUser(login);;
	var userList = Users.getUsersList(login);
	res.render('userlist', {
			name: user.fullName,
			role: user.role,
			isAdmin: user.role === 'admin',
			users: userList
		});
};

function createView(req, res){
	var user = User.getUser(req.login);
	res.render('adduser', {
			name: user.fullName,
			role: user.role
		});
};

function create(req, res){
	var login = req.body['login'];
	var password = req.body['password'];
	var fullName = req.body['fullName'];
	var mail = req.body['mail'];
	var role = req.body['role'] || 'user';
	var validData = User.validateUser(login, password, fullName, mail);

	if(validData) {
		var user = new UserClass(login, password, fullName, mail, role);
		user.save();
		Users.get().add(user.login);
		res.redirect('/user');
	} else {
		res.redirect('back');
	}
};

function updateView(req, res){
	var user = req.user;
	var me = User.getUser(req.login);
	if(user){
		res.render('edituser', {
			login: user.login,
			fullName: user.fullName,
			password: user.password,
			mail: user.mail,
			name: me.fullName,
			role: me.role
		});
	} else {
		res.render('404', {
			name: me.fullName,
			role: me.role
		});
	}
};

function update(req, res){
	var user = req.user;
	if(user){
		var password = req.body['password'];
		var fullName = req.body['fullName'];
		var mail = req.body['mail'];
		var validData = User.validateUser(user.login, password, fullName, mail);

		if(validData) {
			user.password = password;
			user.fullName = fullName;
			user.mail = mail;
			user.save();
			res.redirect('/user');
		} else {
			res.redirect('back');
		}
	} else {
		res.redirect('/');
	}
}

function dropView(req, res){
	var dropingUser = req.params['login'];
	if(dropingUser && Users.get().check(dropingUser)){
		var me = User.getUser(req.login);
		res.render('dropuser', {
			login: dropingUser,
			name: me.fullName,
			role: me.role
		});
	} else {
		res.redirect('/list');
	}
}
function drop(req, res){
	var dropingUser = req.params['login'];
	var users = Users.get();
	if(dropingUser && users.check(dropingUser)){
		users.remove(dropingUser);
	}
	
	
	res.redirect('/');
}