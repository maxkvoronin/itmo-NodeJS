const express = require('express');
const router = express.Router();

router.use('/:user/:action', function(req, res, next) {
	if(req.params.action === '0') 
    next('ID user error'); //Генерация ошибки
	res.send(`user:${req.params.user} action: ${req.params.action}`);
});

module.exports = router;