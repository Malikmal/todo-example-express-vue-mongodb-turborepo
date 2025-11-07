import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DB_URI: z.string().min(1, "DB_URI is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().default("http://localhost:3000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
