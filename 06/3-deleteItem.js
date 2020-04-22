const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

deleteItem()
  .then(print)
  .catch(print)

function deleteItem() {
  const params = {
    "TableName": "GMJS.User",
    "Key": {
      "UserId": {
        "S": "001"
      }
    },
    "ReturnConsumedCapacity": "TOTAL"
  }
  return dynamodb.deleteItem(params).promise()
}