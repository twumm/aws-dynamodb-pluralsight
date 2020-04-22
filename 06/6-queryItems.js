const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

const params = {
  "TableName": "GMJS.JobApplication",
  "KeyConditionExpression": "JobId = :jobid",
  "ExpressionAttributeValues": {
    ":jobid": { S: "XXX" }
  },
  "ReturnConsumedCapacity": "TOTAL"
}

dynamodb
  .query(params).promise()
  .then(print)
  .catch(print)