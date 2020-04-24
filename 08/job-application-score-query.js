const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

const params = {
  "TableName": "GMJS.JobApplication",
  "KeyConditionExpression": "JobId = :jobid",
  "FilterExpression": "Score >= :score",
  "ExpressionAttributeValues": {
    ":jobid": { S: "19d032ab-2867-4aa2-a02b-99d8e3e656c7" },
    ":score": { N: "50" }
  },
  "ReturnConsumedCapacity": "TOTAL"
}

dynamodb
  .query(params).promise()
  .then(print)
  .catch(print)