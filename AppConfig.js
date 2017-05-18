var filename = './config/config-api.json';
var fs = require('fs');

var getMongoUrl = function(){
    if (fs.existsSync(filename)) {
        var configAPI = require(filename);
        return configAPI.mongoUrl;
    }else{
        return process.env.MONGO_URL;
    } 
}

var getKeys = function () {

    if (fs.existsSync(filename)) {

        var configAPI = require(filename);
        var keys = {};
        keys.consumer_key = configAPI.consumerKey;
        keys.consumer_secret = configAPI.consumerSecret;
        keys.access_token_key = configAPI.accessTokenKey;
        keys.access_token_secret = configAPI.accessTokenSecret;

        //return JSON.stringify( keys );
        return keys;

    } else {

        var keys = {};
        keys.consumer_key = process.env.CONSUMER_KEY;
        keys.consumer_secret = process.env.CONSUMER_SECRET;
        keys.access_token_key = process.env.ACCESS_TOKEN_KEY;
        keys.access_token_secret = process.env.ACCESS_TOKEN_SECRET;

        //return JSON.stringify( keys );
        return keys;

    }


}

module.exports.getKeys = getKeys;
module.exports.getMongoUrl = getMongoUrl;