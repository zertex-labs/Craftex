import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from "@utils/constants";
import { object, string, array, mixed, SchemaOf } from "yup";

export interface Inputs {
  title: string;
  cover: File | undefined;
  developers: {
    email: string;
  }[];
}

export const developerSchema = object({
  email: string().email("Developer email must be valid").required(),
});

type UnvalidatedFile = File | undefined;

export const validationSchema: SchemaOf<Inputs> = object({
  title: string()
    .min(4, "Title must be at least 4 characters long")
    .max(64, "Title can't be longer than 64 characters")
    .required("This field is required"),
  cover: mixed()
    .test(
      "modcheck",
      "This file is required",
      (value: UnvalidatedFile) => !!value
    )
    .test(
      "fileSize",
      "The file is too large",
      (value: UnvalidatedFile) => !!value && value.size <= MAX_FILE_SIZE
    )
    .test(
      "supported",
      "This file type is not supported",
      (value: UnvalidatedFile) =>
        !!value && SUPPORTED_FORMATS.includes(value.type)
    )
    .required(),
  developers: array().of(developerSchema).required(),
});
