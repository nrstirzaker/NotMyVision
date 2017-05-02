var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/CapacityTest');

var Collection = mongoose.model('TestTweet');

var tweetSchemaTest = new Schema({

        id : {type : String, required: true, unique: true},
        mediaUrl : String,
        tweetCreatedAt : Date,
        text : String,
        createdAt : Date,
        updatedAt : Date

});


tweetSchemaTest.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

var TestTweet = mongoose.model('TestTweet', tweetSchemaTest);

// make this available to our users in our Node applications
module.exports = TestTweet;
module.exports = Collection;