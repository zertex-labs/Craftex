import type { APIRoute } from "astro";
import { LuciaError } from "lucia";

import { LuciaProviderIds } from "$lib/db";
import { response } from "$lib/helpers/response";
import { passwordSchema, usernameWithPasswordSchema } from "$lib/shared";
import auth from "$lib/lucia";
import { z } from "zod";

export const POST: APIRoute = async ({ locals, request }) => {
  const formData = await request.formData();
  const get = formData.get.bind(formData);

  const passInput = formData.get("password");
  const parseRes = usernameWithPasswordSchema
    .merge(
      z.object({
        repeatPassword: passwordSchema,
      })
    )
    .refine((data) => data.repeatPassword == data.password, {
      message: "Passwords do not match",
      path: ["repeatPassword"],
    })
    .safeParse({
      username: get("username"),
      password: get("password"),
      repeatPassword: get("repeatPassword"),
    });

  if (!parseRes.success) {
    const issue = parseRes.error.issues[0];
    return response.error(`Invalid ${issue.path.join(".")}: ${issue.message}`);
  }

  const { password, username } = parseRes.data;

  console.table({
    username,
    password,
  });

  try {
    // we create the user, session creation happens when only when a user logs in
    const user = await auth.createUser({
      key: {
        providerId: LuciaProviderIds["username"],
        providerUserId: username.toLowerCase(),
        password, // hashing handled by lucia
      },

      attributes: {
        username,
      },
    });

    console.log("created user", user);

    return response.success();
  } catch (e) {
    // TODO handle errors better

    console.log("error creating user", e);
    return response.error("An unknown error occurred");
  }
};

