const dynamodb = require('../lib/dynamodb')
const async = require('async')
const gen = require('../lib/generators')

// // Generate data (100 Jobs and 100 Users)
// const allData = gen.generateAllData(100, 100)

// // Setup workloads
// const work = [].concat(
//   function(done) {
//     const tableName = 'GMJS.Job'
//     console.log('Generate', Object.keys(allData[tableName]).length, 'Jobs')
//     processDataset(done, allData, tableName)
//   },
//   function(done) {
//     const tableName = 'GMJS.User'
//     console.log('Generated', Object.keys(allData[tableName]).length, 'Users')
//     processDataset(done, allData, tableName)
//   },
//   function(done) {
//     const tableName = 'GMJS.JobApplication'
//     console.log('Generated', Object.keys(allData[tableName]).length, 'Job Applications')
//     processDataset(done, allData, tableName)
//   }
// )

// // End setup workloads

// function startProcessingDataParallel() {
//   async.parallel(work, function(error, data) {
//     if (error) console.log('Unexpected Error: ', error, error.stack)
//   })
// }

// function startProcessingDataSeries() {
//   async.series(work, function(error, data) {
//     if (error) console.log('Unexpected Error: ', error, error.stack)
//   })
// }

// // startProcessingDataParallel()
// startProcessingDataSeries()

// function executeBatchPut(params) {
//   const request = dynamodb.batchWriteItem(params)
//   return request.promise()
// }

// function processDataset(done, allData, tableName, UnprocessedItems) {
//   let params = buildParams()
//   let requestItemCount = params.RequestItems[tableName].length
//   if (requestItemCount === 0) {
//     done()
//     return
//   }

//   executeBatchPut(params)
//     .then(processBatchPutResponse)
//     .catch(handleError)

//   function processBatchPutResponse(response) {
//     let request

//     if (!response.UnprocessedItems || !response.UnprocessedItems.length) {
//       console.log('   Wrote', requestItemCount, 'items to table', tableName)
//       processDataset(done, allData, tableName)
//       return
//     }

//     let unprocessedCount = Object.keys(response.UnprocessedItems[tableName]).length
//     if (unprocessedCount > 0) {
//       console.log('   Wrote', (requestItemCount - unprocessedCount), 'items to table', tableName, '(Unable to process', unprocessedCount, 'items)')
//       processDataset(done, allData, tableName, response.UnprocessedItems)
//     }
//   }

//   function buildParams() {
//     let dataSet = allData[tableName]
//     let params = {
//       RequestItems: {},
//       "ReturnConsumedCapacity": "TOTAL"
//     }
//     params.RequestItems[tableName] = []

//     if (UnprocessedItems) {
//       params.RequestItems = UnprocessedItems
//     }

//     for (var id in dataSet) {
//       if (params.RequestItems[tableName].length === 25)
//         break

//       let request = {
//         "PutRequest": {
//           "Item": dataSet[id]
//         }
//       }

//       params.RequestItems[tableName].push(request)
//       delete dataSet[id]
//     }
//     return params
//   }

//   function handleError(error) {
//     console.log('   Error:', error, error.stack)
//     if (params.RequestItems[tableName].length !== 0) {
//       processDataset(done, allData, tableName, params.RequestItems)
//     }
//   }
// }

// Generate data (100 Jobs and 100 Users)
var allData = gen.generateAllData(100, 100);

// SETUP WORKLOADS
var work = [].concat(
    function(done) { 
        var tableName = 'GMJS.Job';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Jobs');
        processDataset(done, allData, tableName);
    },
    function(done) { 
        var tableName = 'GMJS.User';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Users');
        processDataset(done, allData, tableName);
    },
    function(done) { 
        var tableName = 'GMJS.JobApplication';
        console.log('Generated',Object.keys(allData[tableName]).length, 'Job Applications');
        processDataset(done, allData, tableName);
    }
);
// END SETUP WORKLOADS

function startProcessingDataParallel() {
    async.parallel(work, function(err, data) {
        if (err)
            console.log('Unexpected Error: ', err, err.stack);
    });
}

function startProcessingDataSeries() {
    async.series(work, function(err, data) {
        if (err)
            console.log('Unexpected Error: ', err, err.stack);
    });
}

// startProcessingDataParallel();
startProcessingDataSeries();

function executeBatchPut(params) {
    var request = dynamodb.batchWriteItem(params);
    return request.promise();
}

function processDataset(done, allData, tableName, UnprocessedItems) {
    var params = buildParams();
    var requestItemCount = params.RequestItems[tableName].length;
    if (requestItemCount === 0) {
        done();
        return;
    }

    executeBatchPut(params)        
        .then(processBatchPutResponse)
        .catch(handleError)

    function processBatchPutResponse(response) {
        var request;

        if (!response.UnprocessedItems || !response.UnprocessedItems.length) {
            console.log('   Wrote', requestItemCount, 'items to table', tableName);
            processDataset(done, allData, tableName);            
            return;
        }
        
        var unprocessedCount = Object.keys(response.UnprocessedItems[tableName]).length;
        if (unprocessedCount > 0) {
            console.log('   Wrote', (requestItemCount - unprocessedCount), 'items to table', tableName, '(Unable to process',unprocessedCount,'items)');
            processDataset(done, allData, tableName, response.UnprocessedItems);
        }
    }

    function buildParams() {
        var dataSet = allData[tableName];
        var params = {
            RequestItems: {},
            "ReturnConsumedCapacity": "TOTAL"
        };
        params.RequestItems[tableName] = [];

        if (UnprocessedItems) {
            params.RequestItems = UnprocessedItems;
        }

        for (var id in dataSet) {
            if (params.RequestItems[tableName].length === 25)
                break;

            var request = {
                "PutRequest": {
                    "Item": dataSet[id]
                }
            };

            params.RequestItems[tableName].push(request);
            delete dataSet[id];
        }
        return params;
    }
    
    function handleError(err) {
        console.log('   Error:', err, err.stack);
        if (params.RequestItems[tableName].length !== 0) {
            processDataset(done, allData, tableName, params.RequestItems);
        }
    }

}