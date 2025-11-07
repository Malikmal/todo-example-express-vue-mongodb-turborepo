import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";
import { databaseConnection } from "./config/database";
import { env } from "./config/env";
import taskRoute from "./routes/task.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(taskRoute);

// Server lifecycle
async function startServer() {
  try {
    // Connect to database
    await databaseConnection.connect();

    // Start Express server
    app.listen(env.PORT, () => {
      console.log(`🚀 API server listening at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await databaseConnection.disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await databaseConnection.disconnect();
  process.exit(0);
});

startServer();

export default app;
