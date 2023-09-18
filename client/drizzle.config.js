import 'dotenv/config';

console.log('process.env.DATABASE_URL', process.env.DB_NAME, process.env.DB_PASSWORD, process.env.DB_USER, process.env.DB_HOST, process.env.DB_PORT) 

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './src/lib/db/schema.ts',
  out: '.drizzle',
  driver: 'mysql2',

  // doesn't connect atm, mysql2 is ass will fix someday
  // manual migrations :NOOOO:  
  dbCredentials: {
    connectionString: process.env.DB_URL,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
  },
  breakpoints: true,
};
