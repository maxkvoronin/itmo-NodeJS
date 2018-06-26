/*
Вот моя база, дамп не получается сделать 

mysql> SELECT * FROM user;
+----+--------+----------------------------------+
| id | login  | hash                             |
+----+--------+----------------------------------+
|  1 | admin  | 7488e331b8b64e5794da3fa4eb10ad5d |
|  2 | max1   | b54abd4de4e21f5b0275e85d34a3b43d |
|  3 | natali | 88c5e0aaa1a3e8146017d394252bec83 |
+----+--------+----------------------------------+

admin пароль 12345
max1 пароль qwerty1
natali пароль q1w2e3
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


