var fs = require('fs');
var path = require('path');

var User = function(login, password, fullName, mail, role){
	this.login = login;
	this.password = password;
	this.fullName = fullName;
	this.mail = mail;
	this.role = role;
};

User.prototype.save = function() {
	var tempObject = {
		password: this.password,
		fullName: this.fullName,
		mail: this.mail,
		role: this.role
	};
	var data = JSON.stringify(tempObject);
	var pathToFile = path.join(__dirname, '/../data/users/', this.login);
	fs.writeFileSync(pathToFile, data);
};

function getUser(login){
	var pathToFile = path.join(__dirname, '/../data/users/', login);
	var data;
	try{
		data = fs.readFileSync(pathToFile);
	} catch (e){
		console.log(e);
		throw new Error("User not found"); 
	}
	var dataObject = JSON.parse(data);
	var user = new User(
		login,
		dataObject.password,
		dataObject.fullName,
		dataObject.mail,
		dataObject.role);
	return user;
};

function hasUser(login, password){
	var result = false;
	try{
		var user = getUser(login);
		if (user.password === password) {
			result = true;
		};
	} catch (e){
		console.log(e);
	}
	return result;
}

function validateUser(login, password, fullName, mail){
	var isСоrrectLogin = login.length >= 5;
	var isСоrrectPassword = password.length >= 3;
	var isСоrrectName = !!fullName;
	var isСоrrectMail = mail.indexOf('@') != -1;

	var res = isСоrrectLogin && isСоrrectPassword && isСоrrectName && isСоrrectMail;
	return res;
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.hasUser = hasUser;
module.exports.getUser = getUser;
