import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { planetscale } from "@lucia-auth/adapter-mysql";

import TableNames from "./db/table_names";
import { connection } from "./db";
import { omit, pick } from "./internal/helpers/object";

export const auth = lucia({
  adapter: planetscale(connection, pick(TableNames, "key", "session", "user")),
  middleware: astro(),
  env: import.meta.env.DEV ? "DEV" : "PROD",
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;
