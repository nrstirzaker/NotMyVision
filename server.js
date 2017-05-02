//var Twitter = require('twit');
//var Twitter = require('twitter-node-client').Twitter;
var Twitter = require('twitter');
var firebase = require('@google-cloud/storage');
var configAPI = require('./config/config-api.json')
var Tweet = require('./MongoDB');

var twitterClient = new Twitter({
  consumer_key: process.env.CONSUMER_KEY || configAPI.consumerKey,
  consumer_secret: process.env.CONSUMER_SECRET || configAPI.consumerSecret,
  access_token_key: process.env.ACCESS_TOKEN_KEY || configAPI.accessTokenKey,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET || configAPI.accessTokenSecret,
});


// var firebaseConfig = {
//     apiKey: process.env.API_KEY || configAPI.apiKey,
//     authDomain: process.env.AUTH_DOMAIN || configAPI.authDomain, 
//     projectId: process.env.PROJECT_ID || configAPI.projectId,
//     storageBucket: process.env.STORAGE_BUCKET || configAPI.storageBucket
// }


var error = function (error) {
  console.log("ERROR: " + error + " at :" + new Date());
}

var success = function (tweet) {
  //console.log(JSON.parse(tweet));
  //var tdata = JSON.parse(tweets);
  //tweets.forEach(function (tweet) {
  console.log("Tweet received: " + new Date());
  if (tweet.entities && tweet.entities.media && tweet.entities.media.length > 0) {
    tweet.entities.media.forEach(function (m) {
      console.log("Meda Tweet received: " + new Date());
      console.log("media url: " + m.media_url);

      var tweetEntity = Tweet({

        id: tweet.id,
        mediaUrl: m.media_url,
        tweetCreatedAt: tweet.created_at,
        text: tweet.text

      });

      tweetEntity.save(function (err) {
        if (err) throw err;
      });


    });
  }

}
//);
//}

//firebase.initializeApp(firebaseConfig);


// var params = { screen_name: '@TimeOutLondon' };
// twitterClient.getUserTimeline(params, error, success);

var stream = twitterClient.stream('user', {});
stream.on('data', success);
stream.on('error', error);


//client.getTweet({ id: '22906929'}, error, success);


//  {
//   if (!error) {
//     console.log(tweets);
//   }else{
//       console.log(error);
//   }
// });