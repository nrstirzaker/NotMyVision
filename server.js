var Twitter = require('twitter');
var appConfig = require('./AppConfig.js');
var Tweet = require('./MongoDB');
var twitterKeys = appConfig.getKeys();

var twitterClient = new Twitter( twitterKeys );



var error = function (error) {
  console.log("ERROR: " + error + " at :" + new Date());
}

var success = function (tweet) {

  console.log("Tweet received: " + new Date());
  if (tweet.entities && tweet.entities.media && tweet.entities.media.length > 0) {
    tweet.entities.media.forEach(function (m) {
      console.log("Meda Tweet received: " + new Date());
      console.log("media url: " + m.media_url);

      var date = new Date();
      var id = date.getTime();

      var tweetEntity = Tweet({
      
        id: id,
        tweetId: tweet.id,
        senderHandle: tweet.user.screen_name,
        mediaUrl: m.media_url,
        sizes : m.sizes,
        tweetCreatedAt: tweet.created_at,
        text: tweet.text


      });

      tweetEntity.save(function (err) {
        if (err) throw err;
      });


    });
  }

}

var stream = twitterClient.stream('user', {});
stream.on('data', success);
stream.on('error', error);
