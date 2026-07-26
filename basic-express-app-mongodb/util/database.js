require('dotenv').config();

const { webcrypto } = require('crypto');
global.crypto = webcrypto;
const { MongoClient, ServerApiVersion } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  client.connect()
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback();
    })
    .catch(err => { 
      console.log(err) 
      throw err;
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

