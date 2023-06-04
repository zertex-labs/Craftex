import { InferModel } from "drizzle-orm";
import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  _fullName: text("full_name"),
  get fullName() {
    return this._fullName;
  },
  set fullName(value) {
    this._fullName = value;
  },
  phone: varchar("phone", { length: 256 }),
});

export type User = InferModel<typeof users>;
