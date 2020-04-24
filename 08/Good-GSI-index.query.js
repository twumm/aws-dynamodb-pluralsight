const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

const userId = "04da254c-4c21-40fe-afa9-aacbc30a864a";

const params = {
  "TableName": "GMJS.JobApplication",
  "IndexName": "UserJobs",
  "KeyConditionExpression": "UserId = :userId",
  "ExpressionAttributeValues": {
      ":userId": { S: userId }
  },
  "ScanIndexForward": false,
  "ReturnConsumedCapacity": "TOTAL"
}

dynamodb
  .query(params).promise()
  .then(print)
  .catch(print);
  