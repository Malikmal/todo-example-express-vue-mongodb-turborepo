import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { errorHandler } from "./middlewares/error.middleware";
import { prisma } from "./lib/prisma";
import { env } from "./config/env";
import { auth } from "./config/auth";
import taskRoute from "./routes/task.route";
import authRoute from "./routes/auth.route";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // Vue dev server default port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(errorHandler);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(authRoute);
app.use(taskRoute);

// Server lifecycle
async function startServer() {
  try {
    // Test Prisma connection
    await prisma.$connect();
    console.log("✅ Successfully connected to database via Prisma");

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
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await prisma.$disconnect();
  process.exit(0);
});

startServer();

export default app;
