var fs = require('fs');
var path = require('path');
var pathToUserListFile = path.join(__dirname, '/../data/users.json');


module.exports.Create = Users;

function Users(){
	this.users = [];
}

Users.prototype.load = function(){
	var data = fs.readFileSync(pathToUserListFile, 'utf-8');
	this.users = JSON.parse(data);
	return this;
};

Users.prototype.valid = function(login, password){
	var result = false;
	
	for(var i = 0; i< this.users.length; i++){
		var user = this.users[i];
		if(user.name === login && user.password == password){
			result = true;
			break;
		}
	}
	
	return result;
};