var mysql = require('mysql');
settings = require('../settings');
var User = require('../models/User');


var conn = mysql.createConnection({
	user: settings.db_user,
	password: settings.db_pwd,
	database: settings.db_name
});

exports.findUser = function(field,value, callback) {
	var user;
	var sql = 'select * from users where ??=?';
	var data = [field,value];
	sql = mysql.format(sql, data);
	console.log(sql);
	conn.query(sql, function(err, results, fields) {
		if (err) {
			return callback(err);
		}
		if (results.length > 0) {
			//User found
			user = new User(results[0]);
		}
		callback(err, user);
		// conn.end();
	});
};

exports.registerUser = function(user,callback) {
	var uid;
	var sql = 'insert into users set ?';
	sql = mysql.format(sql, user);
	console.log(sql);
	conn.query(sql, function(err, results, fields) {
		if (err) {
			return callback(err);
		}
		uid = results.insertId;
		callback(err,uid);
	});
};