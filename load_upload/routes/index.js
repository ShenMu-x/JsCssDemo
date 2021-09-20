var express = require('express');
var fs = require('fs')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  })

  // res.render('index', { title: 'Express' });
});

module.exports = router;
