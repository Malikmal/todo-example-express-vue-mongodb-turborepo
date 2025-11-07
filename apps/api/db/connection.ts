import { MongoClient, Db } from "mongodb";

const DB_URI = process.env.DB_URI || "";

if (!DB_URI) {
  throw new Error("DB_URI environment variable is not defined");
}

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(DB_URI);
    await client.connect();

    console.log("✅ Connected to DB");

    // Use a database name
    db = client.db("mileapp_todo");

    return db;
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    throw error;
  }
}

export function getDatabase(): Db {
  if (!db) {
    throw new Error(
      "Database not initialized. Call connectToDatabase() first."
    );
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    console.log("Disconnected from DB");
  }
}

// Handle graceful shutdown
process.on("SIGINT", async () => {
  if (client) {
    await closeDatabase();
  }
  process.exit(0);
});

process.on("SIGTERM", async () => {
  if (client) {
    await closeDatabase();
  }
  process.exit(0);
});
