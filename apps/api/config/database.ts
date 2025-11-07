import { MongoClient, Db } from "mongodb";
import { env } from "./env";

class DatabaseConnection {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isConnecting = false;
  private connectionPromise: Promise<void> | null = null;

  async connect(): Promise<void> {
    if (this.db) return;

    if (this.isConnecting && this.connectionPromise) {
      return this.connectionPromise;
    }

    this.isConnecting = true;
    this.connectionPromise = this._connect();

    try {
      await this.connectionPromise;
    } finally {
      this.isConnecting = false;
      this.connectionPromise = null;
    }
  }

  private async _connect(): Promise<void> {
    try {
      console.log("🔄 Connecting to DB...");
      this.client = new MongoClient(env.DB_URI);
      await this.client.connect();
      this.db = this.client.db("todoapp");
      console.log("✅ Successfully connected to DB");
    } catch (error) {
      console.error("❌ DB connection error:", error);
      throw error;
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log("🔌 Disconnected from DB");
    }
  }
}

export const databaseConnection = new DatabaseConnection();
