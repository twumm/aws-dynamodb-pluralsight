const AWS = require('aws-sdk')

exports.handler = (event, context, callback) => {
  const dynamodb = new AWS.DynamoDB()
  let promises = []

  event.Records.forEach(record => {
    if (record.eventName === "REMOVE") {
      // Ensure TTL triggered this event
      if (record.userIdentity &&
        record.userIdentity.principalId === "dynamodb.amazonaws.com") {
          const params = {
            Item: record.dynamodb.OldImage,
            TableName: "GMJS.ClosedJob"
          }

          promises.push(dynamodb.putItem(params).promise())
        }
    }
  })
  Promise.all(promises)
    .then(() => callback())
    .catch(error => callback(error))
}