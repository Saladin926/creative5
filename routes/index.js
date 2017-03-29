var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb');
var fs = require('fs');

var MongoClient = mongodb.MongoClient;
var dbUrl = 'mongodb://localhost:27017/heights';
var collection;

MongoClient.connect(dbUrl, function (err, db) {
  
  // we will use this variable later to insert and retrieve a "collection" of data
  collection = db.collection('heights');
  collection.remove(function(err){
      if (err) return console.error(err);
      console.log('collection cleared.');
  });
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    // HURRAY!! We are connected. :)
    console.log('Connection established to', dbUrl);
    
    collection.insert(heights, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted documents into the "heights" collection. The documents inserted with "_id" are:', result.length, result);
      }
      
      // Dont Close connection
      // db.close()
    })
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
	console.log('get');
});

module.exports = router;
