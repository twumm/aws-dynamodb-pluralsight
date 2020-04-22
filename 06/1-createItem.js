const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

var params = {
  'TableName': 'GMJS.User',
  'Item': {
    'UserId': { 'S': '001' },
    'FirstName': { 'S': 'Martin' },
    'NoOfLogins': { 'N': '0' }
  },
  'ReturnConsumedCapacity': 'TOTAL'
}

const promise = dynamodb.putItem(params).promise()

promise
  .then(print)
  .catch(print)