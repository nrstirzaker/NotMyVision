'use strict';

var AWS = require('aws-sdk');
var docClient;

var Database = function () {


};

Database.prototype.init = function () {

    AWS.config.update({
        region: "us-west-2",
        endpoint: "http://localhost:8000"
    });

    docClient = new AWS.DynamoDB.DocumentClient()


};

Database.prototype.write = function (data) {

    if (!docClient) { this.init() };

    var params = {
        TableName: 'NO_VIS',
        Item: data
    };

    docClient.put(params, function (err, data) {




        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });


}

exports.Database = new Database();
console.log('finished');


