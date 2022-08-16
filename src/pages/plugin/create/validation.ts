import { MAX_FILE_SIZE } from "@utils/constants";
import { object, string, array, mixed, SchemaOf } from "yup";

export interface Inputs {
  title: string;
  cover: File | undefined;
  developers: {
    email: string;
  }[];
}

export const developerSchema = object({
  email: string().email().required(),
});

export const validationSchema: SchemaOf<Inputs> = object({
  title: string().min(1).max(64).required(),
  cover: mixed()
    .test("fileSize", "The file is too large", (value: File) => {
      if (!value) return true;
      console.log(value + "form!!!!");
      return value.size <= MAX_FILE_SIZE;
    })
    .required(),
  developers: array().of(developerSchema).required(),
});
