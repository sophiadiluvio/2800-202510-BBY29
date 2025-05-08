// app/api/mongodb.js

import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;

