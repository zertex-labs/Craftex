import { users } from "./schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { migrate } from "drizzle-orm/mysql2/migrator";

const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});
export const db = drizzle(connection, { logger: true });


// Prefix commands with DO_MIGRATE=true to run migrations
// Example: DO_MIGRATE=true npm run dev

// Run npm run db:generate to generate migrations
if (process.env.DO_MIGRATE) {
  migrate(db as any, { migrationsFolder: "./db/migrations" });
}

export const getUsers = async () => await db.select().from(users);
