/*
 * логин admin
 * пароль 12345
*/

const express = require('express'); 
const app = express(); 
const path = require('path');
const mustacheExpress = require('mustache-express');
const routes = require('./routes/index.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname,'/views'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use(cookieParser());
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret:'11111111',
	name:'hash',
	cookie:{
		httpOnly: true,
		maxAge: 300000
	}
}));

app.use('/', routes);

app.listen(8080);


