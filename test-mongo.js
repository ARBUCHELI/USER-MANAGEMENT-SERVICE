require('dotenv').config();
const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const dbs = await client.db().admin().listDatabases();
    console.log("Databases:", dbs.databases.map(db => db.name));
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    await client.close();
  }
}

testConnection();
