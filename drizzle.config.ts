import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./auth/schema.ts", // IMPORTANT
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
