import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DB_URI: z.string().min(1, "DB_URI is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
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
