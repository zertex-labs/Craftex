import {
  drizzle,
  postgres as pg,
} from "https://deno.land/x/drizzle@v0.23.85/postgres.ts";
import { users } from "./schema/user.ts";

export enum Table {
  USERS = "users",
}

const requiredEnvVars = [
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
];
if (requiredEnvVars.some((key) => !Deno.env.get(key))) {
  throw new Error(
    "Missing environment variables for Postgres" +
      `Missing: ${requiredEnvVars
        .filter((key) => !Deno.env.get(key))
        .join(", ")}`
  );
}

const pool = pg({
  host: Deno.env.get("POSTGRES_HOST"),
  port: parseInt(Deno.env.get("POSTGRES_PORT")!),
  user: Deno.env.get("POSTGRES_USER"),
  password: Deno.env.get("POSTGRES_PASSWORD"),
  database: Deno.env.get("POSTGRES_DB"),
});

// deno-lint-ignore no-explicit-any
export const db = drizzle(pool as any);

const insertedUsers = db.insert(users).values([
  {
    username: "admin",
  },
]).returning();

console.log(insertedUsers);