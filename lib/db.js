import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://catat:vbq0U3LBYHi3iAr5@cluster0.nhdmh.mongodb.net/books?retryWrites=true&w=majority"
  );

  return client;
}