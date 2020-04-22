const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

// const params = {
//   "TableName": "GMJS.User",
//   "Key": {
//     "UserId": { "S": "001" }
//   },
//   "ReturnConsumedCapacity": "TOTAL",
//   "UpdateExpression": "SET #LN = :t, #NOL = :n",
//   "ExpressionAttributeNames": {
//     "#LN": "LastName",
//     "#NOL": "NoOfLogins"
//   },
//   "ExpressionAttributeValues": {
//     ":t": { "S": "Chauhan" },
//     ":n": { "N": "1" }
//   }
// }

const params = {
  "TableName": "GMJS.User",
  "Key": {
    "UserId": { "S": "001" }
  },
  "ReturnConsumedCapacity": "TOTAL",
  "UpdateExpression": "ADD #NOL :n",
  "ExpressionAttributeNames": {
    "#NOL": "NoOfLogins"
  },
  "ExpressionAttributeValues": {
    ":n": { "N": "1" },
    ":max": { "N": "5" }
  },
  "ConditionExpression": "#NOL < :max"
}

const promise = dynamodb.updateItem(params).promise()
promise
  .then(print)
  .catch(print)
