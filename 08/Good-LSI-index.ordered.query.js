const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

const params = {
  "TableName": "GMJS.JobApplication",
  "IndexName": "JobApplicationScore",
  "KeyConditionExpression": "JobId = :jobid AND Score >= :score",
  "ExpressionAttributeValues": {
    ":jobid": { S: "c049b4fb-e4f9-4fcb-b659-50da4331df94" },
    ":score": { N: "50" }
  },
  "ScanIndexForward": false,
  "ReturnConsumedCapacity": "TOTAL"
}

dynamodb
  .query(params).promise()
  .then(print)
  .catch(print)