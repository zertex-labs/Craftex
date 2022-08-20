import { createRouter } from "../context";
import { object } from "zod";

export const listRouter = createRouter().query("create", {
  input: object({}),
  resolve: async ({ input, ctx }) => {},
});
