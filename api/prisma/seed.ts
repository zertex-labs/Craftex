import { Prisma, PrismaClient } from "../generated/client/deno/edge.ts";
import { logger } from "../src/logger.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const env = config();

logger.info("Seeding database...");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL,
    },
  },
});

logger.info("Connected to database...");

const seedData: Prisma.TestCreateInput[] = [
  {
    name: "Test 1",
    email: "test1@gmail.com",
  },
  {
    name: "Test 2",
    email: "test2@gmail.com",
  },
  {
    name: "Test 3",
    email: "test3@gmail.com",
  },
];

logger.info("Seeding...");
for (const data of seedData) {
    prisma.test.deleteMany({where: {name: {contains: "Test"}}})
    logger.info(`Created test: ${data.name}`);
}

logger.info("Seeding complete.");
