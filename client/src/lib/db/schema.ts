import { mysqlTable, bigint, varchar } from "drizzle-orm/mysql-core";

import TableNames from "./table_names";

export const user = mysqlTable(TableNames.user, {
  id: varchar("id", {
    length: 15,
  }).primaryKey(),

  username: varchar("username", {
    length: 64,
  }).notNull(),
});

export const key = mysqlTable(TableNames.key, {
  id: varchar("id", {
    length: 255,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  hashedPassword: varchar("hashed_password", {
    length: 255,
  }),
});

export const session = mysqlTable(TableNames.session, {
  id: varchar("id", {
    length: 128,
  }).primaryKey(),
  userId: varchar("user_id", {
    length: 15,
  }).notNull(),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

