import { Prisma } from "@prisma/client";
import { object, string } from "zod";
import { PluginSchema } from "../global.schema";
import { createProtectedRouter } from "../protected-router";

function makeListSelect<T extends Prisma.ListSelect>(
  select: Prisma.Subset<T, Prisma.ListSelect>
): T {
  return select;
}

const defaultListSelect = makeListSelect({
  author: true,
  userId: true,
  id: true,
  plugins: true,
  recommendations: true,
  title: true,
});

export const listRouter = createProtectedRouter().mutation("create", {
  input: object({
    listName: string(),
    selected: PluginSchema.array(),
    userId: string().cuid(),
  }),
  resolve: async ({
    input: { listName, selected, userId },
    ctx: { prisma: db },
  }) => {

    return db.list.create({
      data: {
        author: {
          connect: {
            id: userId,
          },
        },
        title: listName,
        plugins: {
          connect: [
            ...selected.map((s) => ({
              id: s.id,
            })),
          ],
        },
      },
      select: { id: true },
    });
  },
});
