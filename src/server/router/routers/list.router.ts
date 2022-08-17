import { createRouter } from "../context";
import { object } from "yup";

export const listRouter = createRouter().query("create", {
  input: object({}),
  resolve: async ({ input, ctx }) => {},
});