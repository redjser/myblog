function Article(article) {
	this.id = article.id;
	this.title = article.title;
	this.text = article.text;
	this.pub_time = format(article.pub_time);
}

function format(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var hour = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	return year + '年' + month + '月' + day + '日' + hour + '时' + minutes + '分' + seconds + '秒';
}

Article.prototype.getTitle = function() {
	return this.title;
};

Article.prototype.setTitle = function(title) {
	this.title = title;
}

Article.prototype.getText = function() {
	return this.text;
};

Article.prototype.setText = function(text) {
	this.text = text;
};

Article.prototype.getPubTime = function() {
	return this.pub_time;
};

Article.prototype.setPubTime = function(pub_time) {
	this.pub_time = pub_time;
};

Article.prototype.getAuthor = function() {
	return this.author;
}

Article.prototype.setAuthor = function(author) {
	this.author = author;
}


module.exports = Article;