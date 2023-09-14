export const LuciaTableNames = {
  user: "auth_user",
  session: "user_session",
  key: "user_key",
} as const;

import { mysqlTable, bigint, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable(LuciaTableNames.user, {
  id: varchar("id", {
    length: 15,
  }).primaryKey(),

  username: varchar("username", {
    length: 64,
  }).notNull(),
});

export const key = mysqlTable(LuciaTableNames.key, {
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

export const session = mysqlTable(LuciaTableNames.session, {
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

