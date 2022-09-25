const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let database;
async function ConnectToDatabase() {
  const client = await MongoClient.connect("mongodb://127.0.0.1:27017");
  database = client.db("gallery");
}
function getDb() {
  if (!database) {
    throw { message: "Database not connected!" };
  }
  return database;
}

const ObjectId = mongodb.ObjectId;
module.exports = {
  ConnectToDatabase: ConnectToDatabase,
  getDb: getDb,
  ObjectId: ObjectId,
};
