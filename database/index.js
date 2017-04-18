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

var UserSchema = new mongoose.Schema({
  username       : String,
  weightlog      : {},
  google         : {
    id           : String,
    token        : String,
    email        : String,
    name         : String
  }
});
var User = mongoose.model('User',UserSchema);

exports.Connection = mongoose.connection;
exports.User = User;
exports.Height = Height;