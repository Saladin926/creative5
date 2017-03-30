var express = require('express');
var router = express.Router();
var fs = require('fs');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/heights';
mongoose.connect(dbUrl);


var HeightSchema = new mongoose.Schema({
  gender: String,
  feet: {type:Number},
  inches: {type:Number},
  total:{type:Number},
});
var Height = mongoose.model('Height',HeightSchema);

var maleHeights; //json object for male heights
fs.readFile('data/male.json', 'utf8', function (err, data) {
	if (err) throw err;
	console.log(data);
	maleHeights = JSON.parse(data);
});

var femaleHeights; //json object for female heights
fs.readFile('data/female.json', 'utf8', function (err, data) {
	if (err) throw err;
	console.log(data);
	femaleHeights = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/api/height', function(req, res) {
	console.log('get');
});

router.post('/api/height', function(req, res) {
	var newHeight = new Height(req.body);
	newHeight.save(function(err, post) {
	    if (err) return console.error(err);
	    res.sendStatus(200);
	  });
});

module.exports = router;
