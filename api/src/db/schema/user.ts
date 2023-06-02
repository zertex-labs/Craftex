import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "https://deno.land/x/drizzle@v0.23.85/pg-core.ts";
import { Table } from "../index.ts";

export const users = pgTable(Table.USERS, {
  uuid: uuid("uuid").primaryKey().default("uuid_generate_v4()"),
  username: varchar("username", { length: 255 }),
  password: varchar("password", { length: 255 }),
  created_at: timestamp("created_at").default(new Date()),
  updated_at: timestamp("updated_at").default(new Date()),
});

export type User = {
  uuid: string;
  username: string;
  password: string;
  created_at: number;
  updated_at: number;
};
