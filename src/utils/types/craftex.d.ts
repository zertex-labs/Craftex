import type { Plugin as PrimitivePlugin, User } from "@prisma/client";

export type Plugin = PrimitivePlugin & {
  developers: User[];
};
