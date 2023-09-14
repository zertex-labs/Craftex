import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const connection = connect({
  
});

export const db = drizzle(connection);

export default db;

export { LuciaTableNames } from "./schema";

