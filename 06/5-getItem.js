const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

const params = {
  "TableName": "GMJS.Job",
  "Key": {
    "CountryId": {
      "S": "YYY"
    },
    "JobId": {
      "S": "XXX"
    }
  },
  "ReturnConsumedCapacity": "TOTAL"
}

const promise = dynamodb.getItem(params).promise()

promise
  .then(print)
  .catch(print)