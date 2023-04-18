import { Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";
import { logger } from "../logger.ts";

const BLACKLISTED_FILES = ["setup.ts"];

export type RouteHandler = (router: Router) => void;
export type RouteMeta = {
  endpoint: string;
  method: string;
};

export const setupRoutes = async (router: Router) => {
  const handlers = Deno.readDirSync("./src/routes");
  for (const { name, isFile } of handlers) {
    if (!isFile) {
      // Skip if not a file, we don't care about nested folders - maybe in a later version :)
      continue;
    }

    if (BLACKLISTED_FILES.includes(name)) {
      // Skip if blacklisted
      continue;
    }

    const __default = (await import(`./${name}`)).default;
    if (!__default) {
      // Skip if no default export
      logger.warn(`No default export found in ${name}`);
      continue;
    }

    const { handler, meta } = __default;

    if(meta && Array.isArray(meta)) {
      meta.forEach((m) => {
        logger.info(`Loaded route ${m.method} ${m.endpoint} from ${name}`);
      });
    } else {
      logger.warn(`No meta found in ${name}`);
    }

    handler(router);
    logger.info(`Loaded all handlers from ${name}`);
  }
};
