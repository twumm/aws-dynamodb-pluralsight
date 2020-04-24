const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

const epochNow = 1587566880356

const params = {
  "TableName": "GMJS.Job",
  "FilterExpression": "CountryId = :country AND ClosingTime > :item",
  "ExpressionAttributeValues": {
    ":country": {
      "S": "18"
    },
    ":time": {
      "N": epochNow.toString()
    }
  },
  "ReturnConsumedCapacity": "TOTAL"
}

dynamodb.scan(params).promise()
  .then(print)
  .catch(print)