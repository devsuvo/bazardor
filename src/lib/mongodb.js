import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI পাওয়া যায়নি, .env.local ঠিক আছে কি না দেখুন");
}

// dev এ বারবার reload হলেও যেন নতুন connection না খোলে
const globalForMongo = globalThis;
if (!globalForMongo._bazarMongoClient) {
  globalForMongo._bazarMongoClient = new MongoClient(uri);
}

export const client = globalForMongo._bazarMongoClient;
export const db = client.db();