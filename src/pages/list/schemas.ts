import { UseFormReturnType } from "@mantine/form";
import type { Plugin } from "@utils/types/craftex";
import { date, number, object, string, ZodType } from "zod";

export type ListCreateInputs = {
  listName: string;
  selected: Plugin[];
};

export type ListSectionProps = {
  form: UseFormReturnType<ListCreateInputs>;
  selected: Plugin[];
};

export const PluginSchema = object({
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

export const ListNameSchema = string().min(
  8,
  "List name must be at least 8 characters"
);

export const ListCreateSchema: ZodType<ListCreateInputs> = object({
  listName: ListNameSchema,
  selected: PluginSchema.array(),
});
