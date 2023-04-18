import { Router } from "https://deno.land/x/oak@v12.2.0/mod.ts";

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

    const { handler, meta } = (await import(`./${name}`)).default;
    if (!handler) {
      // Skip if no default export
      console.error(`No default export found in ${name}`);
      continue;
    }

    if(meta && Array.isArray(meta)) {
      meta.forEach((m) => {
        console.log(`Loaded route ${m.method} ${m.endpoint} from ${name}`);
      });
    }

    handler(router);
    console.log(`Loaded all handlers from ${name}`);
  }
};
