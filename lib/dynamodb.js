const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({
  accessKeyId: 'AKIATABMPWOHU75YWILQ',
  secretAccessKey: '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',
  region: 'eu-west-3',
})

module.exports = dynamodb