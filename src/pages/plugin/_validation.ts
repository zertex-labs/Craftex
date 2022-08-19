import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from "@utils/constants";
import { object, string, array, any, ZodType } from "zod";

export interface Inputs {
  title: string;
  cover?: File;
  developers: {
    email: string;
  }[];
}

export const developerSchema = object({
  email: string().email("Developer email must be valid"),
});

type UnvalidatedFile = File | undefined;

export const validationSchema: ZodType<Inputs> = object({
  title: string()
    .min(4, "Title must be at least 4 characters long")
    .max(64, "Title can't be longer than 64 characters"),
  cover: any()
    .refine((value: UnvalidatedFile) => !!value, {
      message: "This file is required",
    })
    .refine(
      (value: UnvalidatedFile) => !!value && value.size <= MAX_FILE_SIZE,
      {
        message: "The file is too large",
      }
    )
    .refine(
      (value: UnvalidatedFile) =>
        !!value && SUPPORTED_FORMATS.includes(value.type),
      { message: "This file type is not supported" }
    ),
  developers: developerSchema.array(),
});
