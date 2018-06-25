/*

*/
const express = require("express");
const router = express.Router();

const crypto = require('crypto');
const model = require('../model/model.js');

let hash;

router.get('/admin', (req, res, next) => {
  if(req.cookies.name === hash && hash !== undefined){
    res.render('welcome');
  } else {
    res.render('admin_auth', { message: 'Введите пароль:'});
  }
});

router.post('/auth', (req, res, next) => {
  model.getPassFromDB(req.body.login)
    .then(([password, id]) => {
      if (password === undefined)
        res.render('admin_auth', { message: 'Неверный пользователь'});
      else if (password === req.body.pass) {
        hash = crypto.createHash('md5').update(req.body.login).update(password).digest('hex');
        res.cookie('name', hash, {httpOnly: true});
        res.cookie('userid', id, {httpOnly: true});
        res.render('welcome');
      }
      else {
        res.render('admin_auth', { message: 'Неверный пароль'});
      }
    })
    .catch((error) => {
        return next(error);        
    }); 
});

router.post('/edit', async (req, res, next) => {
  try {
    await model.changeProfile(req.body.nwLogin, req.body.nwPass, req.cookies.userid);
    res.render('welcome', { message:' Ваш пароль изменен.'});
  } 
  catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.session = null;
  res.cookie('name', hash, {expires: new Date(0)});
  res.cookie('userid', 0, {expires: new Date(0)});

  res.render('admin_auth', { message: 'Вы разлогинились'});
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