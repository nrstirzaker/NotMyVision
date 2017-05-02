var Random = require('random-js');
var mongoose = require('mongoose');
var Server = require('mongodb').Server;
var Db = require('mongodb').Db
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/CapacityTest');


var db = new Db('CapacityTest', new Server('localhost', 27017));




// tweetSchemaTest.pre('save', function (next) {
//   // get the current date
//   var currentDate = new Date();

//   // change the updated_at field to current date
//   this.updatedAt = currentDate;

//   // if created_at doesn't exist, add to that field
//   if (!this.createdAt)
//     this.createdAt = currentDate;

//   next();
// });

//var TestTweet = mongoose.model('TestTweet', tweetSchemaTest);
db.open(function (err, db) {

  if (err) console.log(err);

  var Collection = db.collection('testtweets');

  console.log("Start");

  var text = "the quick brown fox jumped over the laxy dog.the quick brown fox jumped over the laxy dog.the quick brown fox jumped over the laxy dog.1232"
  var url = "http://pbs.twimg.com/media/C-zt3eXWAAADdTu.jpg";
  var engine = Random.engines.mt19937().autoSeed();
  var distribution = Random.integer(1000000, 9999999);

  var batch = Collection.initializeUnorderedBulkOp({ useLegacyOps: true });

  for (var o = 0; o < 100; o++) {
    console.log("o: " + o);
    for (var i = 0; i < 1000; i++) {
      console.log("i: " + i);
      var date = new Date();
      var randomId = distribution(engine) + date.getTime();

      batch.insert({

        id: randomId,
        mediaUrl: url,
        tweetCreatedAt: new Date(),
        text: text

      });



    }

    batch.execute(function (error, result) {
      if (error) {
        console.log("ERROR: " + error);
      }
      if (result) {
        console.log("RESULT: " + result);
      }
    });

  }
  db.close();
});


console.log("FINISHED!");