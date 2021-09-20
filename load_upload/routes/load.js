var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function (req, res, next) {
    let data = fs.readFileSync('./public/movie.mp4');
    res.send(data);
});

module.exports = router;
