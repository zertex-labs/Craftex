import {
  bigint,
  json,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

import { CUID2_LENGTH, createId } from "../helpers/cuid2";
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

export type PluginVersion = {
  pluginId: string; // used to find the plugin in spaces
  version: string;
};
export const pluginVersions = mysqlTable(TableNames.pluginVersions, {
  id: varchar("id", {
    length: CUID2_LENGTH,
  })
    .$defaultFn(() => createId())
    .primaryKey(),

  pluginId: varchar("plugin_id", {
    length: CUID2_LENGTH,
  }).notNull(),

  versions: json("versions").$type<PluginVersion[]>().notNull(),
});

export const plugin = mysqlTable(TableNames.plugin, {
  id: varchar("id", {
    length: CUID2_LENGTH,
  })
    .$defaultFn(() => createId())
    .primaryKey(),

  uploaderId: varchar("uploader_id", {
    length: 15,
  }).notNull(),

  dataId: varchar("data_id", {
    length: CUID2_LENGTH,
  }).notNull(),

  title: varchar("title", {
    length: 255,
  }).notNull(),
  // TODO short description sounds dumb think of a better name
  shortDescription: varchar("short_description", {
    length: 255,
  }).notNull(),
  description: varchar("description", {
    length: 1024,
  }).notNull(),
  latestVersion: varchar("latest_version", {
    length: 32,
  }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});