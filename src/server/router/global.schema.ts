import { SessionUser } from "next-auth";
import { date, number, object, string, lazy, ZodType } from "zod";
import type { Plugin } from "@utils/types/craftex";

export type Author = SessionUser;

export const Author: ZodType<Author> = lazy(() =>
  object({
    id: string().cuid(),
    name: string(),
    email: string().email(),
    image: string(),
  })
);

export const PluginSchema: ZodType<Plugin> = object({
  id: string().cuid(),
  title: string(),
  stars: number(),
  developers: object({
    id: string().cuid(),
    name: string(),
    email: string(),
    emailVerified: date().nullable(),
    image: string(),
  }).array(),
});
