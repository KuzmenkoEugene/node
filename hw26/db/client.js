const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'online_store';

async function connectToDb() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}

async function closeDb(client) {
  await client.close();
}

module.exports = {
  connectToDb,
  closeDb
};
