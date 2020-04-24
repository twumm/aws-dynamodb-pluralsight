const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

var userId = "04da254c-4c21-40fe-afa9-aacbc30a864a";
var totalCapacityConsumed = 0;
var totalItemsFound = 0;

var params = {
  "TableName": "GMJS.JobApplication",
  "FilterExpression": "UserId = :userId",
  "ExpressionAttributeValues": {
    ":userId": { S: userId }
  },  
  "ReturnConsumedCapacity": "TOTAL"
};

console.log("Scanning job applications for UserId", userId);
dynamodb.scan(params, scanResponse);

function scanResponse(err, data) {
    if (err) {
      print(err);
      return;
    } else if (data) {
      totalCapacityConsumed += data.ConsumedCapacity.CapacityUnits;
      totalItemsFound += data.Items.length;

      if (data.LastEvaluatedKey) {
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        console.log('   Scanning next page...');
        dynamodb.scan(params, scanResponse);
      } else {
        console.log('Finished!');
        console.log('Job Applications found: ', totalItemsFound);
        console.log('RCUs consumed: ', totalCapacityConsumed);
      }
    }
}