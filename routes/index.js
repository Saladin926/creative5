var express = require('express');
var router = express.Router();
var fs = require('fs');
var passport = require('passport');
var db = require('../database');

var Height = db.Height;
var User = db.User;

//check if we already have the example data in the db
User.count({}, function(err,count) {
  if (!count) {
    fs.readFile('data/userWeights.json', 'utf8', function (err, data) {
      if (err) throw err;
      console.log("Inserting user weights");
      User.collection.insert(JSON.parse(data),function(err,docs) {
        if (err) throw err;
        console.log("User weights successfully inserted")
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

router.get('/api/weights', function(req, res) {
  User.find({}, 'weightlog', function(err,weights) {
    if (err) throw err;
    res.send(weights);
  });
});

router.post('/api/height', function(req, res) {
  var newHeight = new Height(req.body);
  newHeight.save(function(err, post) {
    if (err) return console.error(err);
    res.sendStatus(200);
  });
});

router.post('/api/weight', function(req, res) {
  var weight = req.body.weight;
  // Create the day key for saving in the database
  var dateObj = new Date(req.body.day);
  var day = dateObj.getUTCDate();
  var month = dateObj.getUTCMonth() + 1; //months are zero indexed
  var year = dateObj.getUTCFullYear();
  var dayKey = (day < 10 ? '0'+day : day) + '-' + (month < 10 ? '0'+month : month) + '-' + year;

  var setParams = {};
  setParams['weightlog.' + dayKey] = weight;

  User.findByIdAndUpdate(req.user._id, {
    '$set': setParams
  }, function(err) {
    if (err) throw err;
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

router.get('/user', function(req, res) {
  res.json({
        'user': req.user
    });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
