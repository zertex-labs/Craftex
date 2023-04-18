import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";

const MONGO_URI = Deno.env.get("MONGO_URI");
const MONGO_DB = Deno.env.get("MONGO_DB");

if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
if (!MONGO_DB) throw new Error("MONGO_DB is not defined");

const client = new MongoClient();
await client.connect(MONGO_URI);

const db = client.database(MONGO_DB);

console.log("Connected to database - " + db.name);

export default { db, client };
