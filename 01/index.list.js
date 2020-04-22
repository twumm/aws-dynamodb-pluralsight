const dynamodb = require('../lib/dynamodb')
const print = require('../lib/helpers').printPretty

listTables()
  .then(describeJobTable)
  .catch(print)

function listTables() {
  console.log('List Tables: ')

  let params = {}
  const listTable = dynamodb.listTables(params).promise()
  listTable.then(print)
  return listTable
}

function describeJobTable() {
  console.log('Describe Job Table: ')

  let params = {
    'TableName': 'GMJS.Job'
  }
  const descTable = dynamodb.describeTable(params).promise()
  console.log('print Job Table')
  descTable.then(print)
  return descTable
}