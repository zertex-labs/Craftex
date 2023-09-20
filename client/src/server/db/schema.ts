import {
  bigint,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import TableNames from "./table_names";
import { CUID2_LENGTH } from "$lib/constants";
import type { PluginVersionEntry } from "$lib/types";

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

export const pluginVersions = mysqlTable(TableNames.pluginVersions, {
  // use '$lib/helpers/cuid2.ts' to create
  id: varchar("id", {
    length: CUID2_LENGTH,
  }).primaryKey(),

  pluginId: varchar("plugin_id", {
    length: CUID2_LENGTH,
  }).notNull(),

  versions: json("versions").$type<PluginVersionEntry[]>().notNull(),
});

export const plugin = mysqlTable(TableNames.plugin, {
  // use '$lib/helpers/cuid2.ts' to create
  id: varchar("id", {
    length: CUID2_LENGTH,
  }).primaryKey(),

  title: varchar("title", {
    length: 255,
  }).notNull(),
  description: varchar("description", {
    length: 1024,
  }).notNull(),
  latestVersion: varchar("latest_version", {
    length: 32,
  }).notNull(),

  publisherId: varchar("publisher_id", {
    length: 15,
  }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
