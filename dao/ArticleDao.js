var mysql = require('mysql');
settings = require('../settings');
var Article = require('../models/Article');
var UserDao = require('./UserDao');
var Promise = require('bluebird');

var conn = mysql.createConnection({
	user: settings.db_user,
	password: settings.db_pwd,
	database: settings.db_name
});

exports.findArticle = function(authorId, callback) {
	var article;
	var sql = 'select * from articles';
	if (authorId) {
		sql += ' where authorId=?';
	}
	sql = mysql.format(sql, authorId);
	console.log(sql);
	conn.query(sql, function(err, results, fields) {
		if (err) {
			return callback(err);
		}
		if (results.length > 0) {
			Promise.map(results, function(result) {

				return Promise.promisify(UserDao.findUser)('id', result.authorId)
					.then(function(user) {
						article = new Article(result);
						article.setAuthor(user);
						return article;
					});
			}).then(function(articles) {
				callback(err, articles);
			}).catch(function(err) {
				callback(err);
			});

		}
	});
};

exports.publishArticle = function(article, callback) {
	var articleId;
	var sql = 'insert into articles set ?';
	sql = mysql.format(sql, article);
	console.log(sql);
	conn.query(sql, function(err, results, fields) {
		if (err) {
			return callback(err);
		}
		articleId = results.insertId;
		callback(err, articleId);
	});
};