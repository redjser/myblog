var express = require('express');
var router = express.Router();
var User = require('../models/User');

var UserDao = require('../dao/UserDao');
var ArticleDao = require('../dao/ArticleDao');

router.post('/test', function(req, res, next) {
	console.log( req.body.data);
	res.render('test');
});

router.get('/', function(req, res, next) {
	ArticleDao.findArticle(null, function(err, articles) {
		if (err) {
			res.locals.message = err.message;
		}
		res.render('index', {
			title: '首页',
			articles: articles
		});
	});

});

router.post('/pub', function(req, res, next) {
	var article = {
		text: req.body.articleText,
		pub_time:new Date(),
		authorId:req.session.user.id
	};
	ArticleDao.publishArticle(article, function(err, articleId) {
		if (err) {
			req.session.message = err.message;
			return res.redirect("/");
		}
		if (articleId) {
			req.session.message = 'Successfully published';
		} else {
			req.session.message = 'publish failed';
		}
		res.redirect("/");
	});
});

router.get('/reg', function(req, res, next) {
	res.render('register', {
		title: '注册'
	});
});

router.post('/reg', function(req, res, next) {
	var newUser = {
		loginId: req.body.loginId,
		password: req.body.password
	};
	UserDao.findUser('loginId', newUser.loginId, function(err, user) {
		if (user) {
			req.session.message = 'duplicate loginId';
			return res.redirect("/reg");
		}
		UserDao.registerUser(newUser, function(err, uid) {
			if (err) {
				req.session.message = err.message;
				return res.redirect("/reg");
			}
			if (uid) {
				newUser.id = uid;
				req.session.user = newUser;
				res.redirect("/");
			} else {
				res.redirect("/reg");
			}
		});
	});
});

router.get('/login', function(req, res, next) {
	res.render('login', {
		title: '登录'
	});
});

router.post('/login', function(req, res, next) {
	UserDao.findUser('loginId', req.body.loginId, function(err, user) {
		if (err) {
			req.session.message = err;
			return res.redirect("/login");
		}
		if (user) {
			if (user.getPwd() !== req.body.password) {
				req.session.message = 'wrong password';
				res.redirect("/login");
			} else {
				req.session.message = 'logged in!';
				req.session.user = user;
				res.redirect("/");
			}
		} else {
			req.session.message = 'user does not exist';
			res.redirect("/login");
		}
	});
});

router.get('/logout', function(req, res, next) {
	req.session.message = 'logged out!';
	req.session.user = null;
	res.redirect("/");
});

module.exports = router;