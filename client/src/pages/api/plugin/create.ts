import type { APIRoute } from "astro";

import { uploadPlugin } from "$lib/s3/helpers";

export const POST: APIRoute = async ({ locals, redirect, request }) => {
  const session = await locals.auth.validate();
  if (!session) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  const files = await request.formData();
  let file = files.get("file") as File;

  console.log("Uploading plugin", file);

  if (!file) {
    return new Response(
      JSON.stringify({
        error: "No file provided",
      }),
      {
        status: 400,
      }
    );
  }

  const uploadRes = await uploadPlugin(file, {
    latestVersion: file.name,
    id: session.user.userId,
  });

  if (uploadRes.failed) {
    return new Response(
      JSON.stringify({
        error: uploadRes.error,
      }),
      {
        status: 400,
      }
    );
  }

  return redirect("/", 302);
};

