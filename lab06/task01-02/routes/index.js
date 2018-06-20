var express = require("express");
var router = express.Router();

// router.post('/add', function(req, res, next) {

// });

router.get('/', (req, res) => {
  res.render('index', { title: 'Done!'});
});

router.post('/ajaxservice/get', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.send([{ name: 'Peter', data: 'bla-bla'} , { name: 'Vasiliy', data: 'ps...'}]);
});


module.exports = router;