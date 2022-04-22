import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const connectionString=`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.nhdmh.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectionString);

  return client;
}
export async function getAllDocuments(client, collection,sort){
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();
  return documents;
}
export async function findOneDocument(client, collection, id){
  const db = client.db();
  const document = await db.collection(collection).findOne({ id: id });
  return document;
}