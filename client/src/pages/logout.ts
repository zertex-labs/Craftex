import type { APIRoute } from "astro";
import { auth } from "../lib/lucia";

export const post: APIRoute = async ({ locals, redirect }) => {
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

  await auth.invalidateSession(session.sessionId);

  locals.auth.setSession(null);

  return redirect("/login", 302);
};

