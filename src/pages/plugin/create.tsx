import type { Plugin as PrimitivePlugin } from "@prisma/client";
import { trpc } from "@trpc";
import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from "@utils/constants";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { any, number, object, string, ZodType } from "zod";

type UnvalidatedFile = File | undefined;

export const validationSchema: ZodType<
  Omit<PrimitivePlugin, "id"> & { cover?: File }
> = object({
  title: string()
    .min(4, "Title must be at least 4 characters long")
    .max(64, "Title can't be longer than 64 characters"),
  developers: string().email("Developer email must be valid").array(),
  stars: number().min(0),
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
});

export default function PluginCreate() {
  const { mutate: createPlugin, data: lastCreatedPlugin } =
    trpc.useMutation("plugin.create");
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    return (
      <React.Fragment>
        <h1>Please sign in.</h1>
        <button onClick={() => signIn()}>Sign in</button>
      </React.Fragment>
    );
  }

  return <h1>Plugin Create</h1>;
}
