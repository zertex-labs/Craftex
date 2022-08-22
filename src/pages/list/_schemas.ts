import { UseFormReturnType } from "@mantine/form";
import type { Plugin } from "@utils/types/craftex";
import { date, number, object, string, ZodType } from "zod";

export type ListCreateInputs = {
  pluginName: string;
  selected: Plugin[];
};

export type ListSectionProps = {
  form: UseFormReturnType<ListCreateInputs>;
  selected: Plugin[];
  span: number;
};

export const PluginSchema = object({
  id: string().cuid(),
  title: string(),
  stars: number(),
  developers: object({
    id: string().cuid(),
    name: string(),
    email: string(),
    emailVerified: date(),
    image: string(),
  }).array(),
});

export const PluginNameSchema = string().min(
  2,
  "Plugin name must be at least 2 characters"
);

export const ListCreateSchema: ZodType<ListCreateInputs> = object({
  pluginName: PluginNameSchema,
  selected: PluginSchema.array(),
});
