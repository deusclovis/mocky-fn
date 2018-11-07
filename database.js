// insert custom modules here
const config = require('./config');

// insert node modules here
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: config.aws.access_key_id,
  secretAccessKey: config.aws.secret_access_key,
  region: config.aws.region
});
const docClient = new AWS.DynamoDB.DocumentClient();

exports.retrieveAll = (tableName, queryObject) => {
  return new Promise((resolve, reject) => {
    queryObject.TableName = tableName;

    docClient.scan(queryObject, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
}

exports.batchGet = (tableName, keys) => {
  return new Promise((resolve, reject) => {
    const params = {
      RequestItems: {}
    }
    params.RequestItems[tableName] = {
      Keys: keys
    }

    docClient.batchGet(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Responses[tableName]);
      }
    });
  });
}

exports.retrieveRecord = (tableName, key) => {
  return new Promise((resolve, reject) => {
    const queryObject = {
      TableName: tableName,
      Key: key
    };

    docClient.get(queryObject, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Item);
      }
    });
  });
}

exports.insertRecord = (tableName, object) => {
  return new Promise((resolve, reject) => {
    const queryObject = {
      TableName: tableName,
      Item: object
    };

    docClient.put(queryObject, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

exports.updateRecord = (tableName, key, object) => {
  return new Promise((resolve, reject) => {
    const queryObject = {
      TableName: tableName,
      Key: key,
      UpdateExpression: 'set message = :m',
      ExpressionAttributeValues: {
        ':m': object.message
      },
      ReturnValues: 'UPDATED_NEW'
    }

    docClient.update(queryObject, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

exports.removeRecord = (tableName, key) => {
  return new Promise((resolve, reject) => {
    const queryObject = {
      TableName: tableName,
      Key: key
    }

    docClient.delete(queryObject, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}