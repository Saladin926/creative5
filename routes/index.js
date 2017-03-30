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

//check if we already have the example data in the db
Height.count({},function(err,count){ 
        if (!count) {
			fs.readFile('data/male.json', 'utf8', function (err, data) {
				if (err) throw err;
				console.log("Inserting male heights");
				Height.collection.insert(JSON.parse(data),function(err,docs){
					if (err) throw err;
					console.log("Male heights successfully inserted")
				});
			});

			fs.readFile('data/female.json', 'utf8', function (err, data) {
				if (err) throw err;
				console.log("Inserting female heights");
				Height.collection.insert(JSON.parse(data),function(err,docs){
					if (err) throw err;
					console.log("Female heights successfully inserted")
				});
			});
        }
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
