import { lucia } from "lucia";
import { astro } from "lucia/middleware";
import { planetscale } from "@lucia-auth/adapter-mysql";

import TableNames from "./db/table_names";
import { connection } from "./db";

export const auth = lucia({
  adapter: planetscale(connection, TableNames),
  middleware: astro(),
  env: import.meta.env.DEV ? "DEV" : "PROD",
  getUserAttributes: (data) => {
    return {
      username: data.username,
    };
  },
});

export type Auth = typeof auth;

