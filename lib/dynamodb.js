require('dotenv').config()
const AWS = require('aws-sdk')

const dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

module.exports = dynamodb