const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

console.log('Increasing RCUs & WCUs to 2: ')

let params = {
  'ProvisionedThroughput': {
    'ReadCapacityUnits': 2,
    'WriteCapacityUnits': 2
  },
  'TableName': 'GMJS.Job'
}

dynamodb.updateTable(params).promise()
  .then(function () {
    let params = { 'TableName': 'GMJS.Job' }
    console.log('Waiting for update to finish...')
    return dynamodb.waitFor('tableExists', params).promise()
  })
  .then(print)
  .catch(print)