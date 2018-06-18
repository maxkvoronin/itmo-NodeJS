const express = require('express');
const app = express();

app.listen(8080);

let usersRout = require('./users.js');
app.use('/', usersRout);