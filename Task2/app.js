var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var authContoller = require('./controllers/authContoller');
var userController = require('./controllers/userController');
var userUtil = require('./helpers/user-util');
var app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));
app.use(express.static('public'));


var indexView = function(req, res) {
	res.redirect('/user');
};

app.get('/', userUtil.isLogin, indexView);

app.use('/auth', authContoller);
app.use('/user', userController);

module.exports = app;