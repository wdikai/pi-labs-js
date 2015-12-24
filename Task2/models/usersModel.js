var fs = require('fs');
var path = require('path');
var User =  require('./userModel');
var pathToFileWithLogins = path.join(__dirname, '/../data/loginList');

function Users(){
	this.logins = [];
}
Users.prototype.get = function(index){
	return this.logins[index];
}

Users.prototype.count = function(){
	return this.logins.length;
}

Users.prototype.check = function(login) {
	return this.logins.indexOf(login);
}

Users.prototype.add = function(login) {
	if (this.check(login) === -1) {
		this.logins.push(login);
		this.save();
	};
}

Users.prototype.remove = function(login) {
	var index = this.check(login);
	if (index !== -1) {
		this.logins.splice(index, 1);
		this.save();
	}
}

Users.prototype.save = function() {
	var data = JSON.stringify(this.logins);
	fs.writeFileSync(pathToFileWithLogins, data);
}

function get(){
	var data = fs.readFileSync(pathToFileWithLogins);
	var result = new Users();
	result.logins = JSON.parse(data);
	return result;
};

function getUsersList(currentUser){
	var result = [];
	var adminPermissions = false, isMe = false;

	if(currentUser){
		adminPermissions = User.getUser(currentUser).role === 'admin';
	}

	var users = get();
	for (var i = 0; i < users.count(); i++) {
		var data = {};
		data.login = users.get(i);
		var user = User.getUser(data.login);

		if(currentUser){
			isMe = (user.login === currentUser);
		}

		data.name = user.fullName;
		data.mail = user.mail;
		data.isDelete = adminPermissions;
		data.isEdit = adminPermissions || isMe;

		result.push(data);
	};

	return result;
};

module.exports.get = get;
module.exports.getUsersList = getUsersList;