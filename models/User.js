function User(user) {
	this.id = user.id;
	this.loginId = user.loginId;
	this.name = user.name;
	this.pwd = user.password;
}

User.prototype.getLoginId=function () {
	return this.loginId;
};

User.prototype.setLoginId=function (loginId) {
	 this.loginId=loginId; 
}

User.prototype.getName = function() {
	return this.name;
};

User.prototype.setName = function(name) {
	this.name = name;
};

User.prototype.getPwd = function() {
	return this.pwd;
};

User.prototype.setPwd = function(pwd) {
	this.pwd = pwd;
};


module.exports = User;