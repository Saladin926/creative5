var express = require('express');
var router = express.Router();
var fs = require('fs');
var passport = require('passport');
var db = require('../database');

var Height = db.Height;

//check if we already have the example data in the db
Height.count({},function(err,count){
  if (!count) {
    fs.readFile('data/male.json', 'utf8', function (err, data) {
      if (err) throw err;
      console.log("Inserting male heights");
      Height.collection.insert(JSON.parse(data),function(err,docs) {
        if (err) throw err;
        console.log("Male heights successfully inserted")
      });
    });

    fs.readFile('data/female.json', 'utf8', function (err, data) {
      if (err) throw err;
      console.log("Inserting female heights");
      Height.collection.insert(JSON.parse(data),function(err,docs) {
        if (err) throw err;
        console.log("Female heights successfully inserted");
      });
    });
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/heights', function(req, res) {
  Height.find({},function(err,heights) {
    if (err) throw err;
    res.send(heights);
  });
});

router.post('/api/height', function(req, res) {
  var newHeight = new Height(req.body);
  newHeight.save(function(err, post) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

/* Google Auth */
router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

router.get('/google/callback',
passport.authenticate('google', {
  successRedirect : '/#',
  failureRedirect : '/?error=loginFail'
}));

module.exports = router;
