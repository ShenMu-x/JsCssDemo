var express = require('express');
var fs = require('fs');
var multer = require('multer')
var router = express.Router();

var upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('test'), function (req, res, next) {
    if (!req.file) {
        res.status(400);
        return res.send('no image');
    }

    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            console.log(err);
            return res.send('upload error');
        }
        let filename = req.file.originalname.split('.')[0] + Date.now() + Math.floor(Math.random() * 1000) + '.' + req.file.mimetype.split('/')[1];
        fs.writeFile('./public/images/' + filename, data, (err, data) => {
            if (err) { console.log(err); return res.send('write error'); }
            res.send('success. images/' + filename);
        })
    })

});

module.exports = router;
