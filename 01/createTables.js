const AWS = require('aws-sdk')
const dynamodb = require('../lib/dynamodb')
const tablePrefix = "GMJS."

function createJobTable() {
  const params = {
    TableName: tablePrefix + "Job",
    KeySchema: [
      {
        AttributeName: "CountryId",
        KeyType: "HASH"
      },
      {
        AttributeName: "JobId",
        KeyType: "RANGE"
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: "CountryId",
        AttributeType: "S"
      },
      {
        AttributeName: "JobId",
        AttributeType: "S"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
  const promise = dynamodb.createTable(params).promise()
  return promise
}

function createUserTable() {
  const params = {
    TableName: tablePrefix + "User",
    KeySchema: [
      {
        AttributeName: "UserId",
        KeyType: "HASH"
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: "UserId",
        AttributeType: "S"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };
  const promise = dynamodb.createTable(params).promise();
  return promise;
}

function createJobApplicationTable() {
  const params = {
    TableName: tablePrefix + "JobApplication",
    KeySchema: [
      {
        AttributeName: "JobId",
        KeyType: "HASH"
      },
      {
        AttributeName: "ApplicantId",
        KeyType: "RANGE"
      }
    ],
    AttributeDefinitions: [
      {
        AttributeName: "JobId",
        AttributeType: "S"
      },
      {
        AttributeName: "ApplicantId",
        AttributeType: "S"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };
  const promise = dynamodb.createTable(params).promise();
  return promise;
}

function done() {
  console.log('Finished creating all three tables.')
}

createJobTable()
  .then(createUserTable)
  .then(createJobApplicationTable)
  .catch(function (err) {
    console.log(err, err.stack)
  })
  .then(done)