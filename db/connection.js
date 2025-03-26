import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: './config.env' });

const uri = process.env.ATLAS_URI;
if (!uri) {
  throw new Error("Missing ATLAS_URI. Check your .env file.");
}
2
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
  console.error("MongoDB connection error:", err);
}

let db = client.db("employees");

export default db;
