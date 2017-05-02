var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/NotMyVision');



var tweetSchema = new Schema({

        id : {type : String, required: true, unique: true},
        mediaUrl : String,
        tweetCreatedAt : Date,
        text : String,
        createdAt : Date,
        updatedAt : Date

});


tweetSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updatedAt = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.createdAt)
    this.createdAt = currentDate;

  next();
});

var Tweet = mongoose.model('Tweet', tweetSchema);

// make this available to our users in our Node applications
module.exports = Tweet;