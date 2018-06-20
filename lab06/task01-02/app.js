var express = require('express'); 
var app = express(); 
var path = require('path');
var mustacheExpress = require('mustache-express');
var routes = require('./routes/index.js');
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'javascripts')));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname,'/views'));
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.use('/', routes);
app.listen(8080);
