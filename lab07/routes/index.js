/*

*/

const express = require("express");
const router = express.Router();

const admin = require('../pwd.json');
const crypto = require('crypto');

let adminHash = crypto.createHash('md5')
                      .update(admin.login)
                      .update(admin.password)
                      .digest('hex');

let guestHash;

router.get('/admin', (req, res, next) => {
  if(req.cookies.name === adminHash){
    res.render('welcome');
  } else {
    res.render('admin_auth', { message: 'Введите пароль:'});
  }
});

router.post('/auth', (req, res, next) => {
  guestHash = crypto.createHash('md5')
                    .update(req.body.login)
                    .update(req.body.pass)
                    .digest('hex');
  
  if (guestHash  === adminHash) {
    res.cookie('name', guestHash, {httpOnly: true});
    res.render('welcome');
  }
  else 
    res.render('admin_auth', { message: 'Неверный пароль'});
});

router.post('/logout', (req, res, next) => {
  req.session = null;
  res.cookie('name', guestHash, {expires: new Date(0)});
  res.render('admin_auth', { message: 'Вы разлоинились'});
});

router.get('/', (req, res, next) => {
  res.render('guest');
});

router.get('/auth', (req, res, next) => {
  res.redirect('/admin');
});

router.get('/logout', (req, res, next) => {
  res.redirect('/admin');
});


module.exports = router;