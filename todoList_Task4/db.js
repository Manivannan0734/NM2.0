
// db.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://mani:55555@cluster0.wgnbiwx.mongodb.net/?retryWrites=true&w=majority';
let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  cachedClient = client;
  return client;
}
