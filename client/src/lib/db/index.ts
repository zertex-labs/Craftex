import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

type ValidLuciaProviderIds = "username" | "github";

export const LuciaProviderIds: Record<
  ValidLuciaProviderIds,
  ValidLuciaProviderIds
> = {
  username: "username",
  github: "github",
} as const;

export const LuciaTableNames = {
  user: "auth_user",
  key: "user_key",
  session: "user_session",
} as const;

export const connection = connect({
  url: import.meta.env.DATABASE_URL,
});
export const db = drizzle(connection);

export default db;

