const bytes = require('utf8-length')

function printPretty(data) {
  const formatted = JSON.stringify(data, null, 4)
  console.log(formatted)
  if (data) console.log('Size of data:', jsonKB(data), 'KB')
}

function jsonKB(data) {
  // Read operation
  if (data.Items) (bytes(JSON.stringify(data.Items))/1024.0).toFixed(1)
  return (bytes(JSON.stringify(data))/1024.0).toFixed(1)
}

module.exports = {
  printPretty,
  jsonKB
}