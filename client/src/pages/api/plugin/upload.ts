import type { APIRoute } from "astro";

import { response } from "$lib/helpers/response";
import { uploadPluginSchema } from "$lib/validation";
import { createId } from "$lib/helpers/cuid2";
import db from "$server/db";
import { plugin } from "$server/db/schema";
import {
  constructPluginKey,
  fileExits,
  uploadPlugin,
} from "$server/s3/helpers";

export const POST: APIRoute = async ({ locals, redirect, request }) => {
  const session = await locals.auth.validate();
  if (!session) return response.error("Unauthorized", 401);

  // -- 1 -- Make sure the form data is valid
  const data = await request.formData();
  const parseRes = uploadPluginSchema.safeParse({
    title: data.get("title"),
    description: data.get("description"),
    version: data.get("version"),
    file: data.get("file"),
  });

  if (!parseRes.success) {
    const issue = parseRes.error.issues[0];
    return response.error(`Invalid ${issue.path.join(".")}: ${issue.message}`);
  }

  // -- ? -- Decompile the jar and parse the plugin.yml. Most of the metadata should be inferred from there.

  const { description, file, title, version: latestVersion } = parseRes.data;

  // -- 2 -- Generate a UUID for the plugin and the plugin key
  const pluginId = createId(true);

  const key = constructPluginKey({
    id: session.user.userId,
    latestVersion,
  });

  // -- 3 -- Make sure the plugin isn't uploaded already on the cdn
  const pluginExits = await fileExits(key);
  if (pluginExits) {
    return response.error(
      `Plugin with key '${key}' found on CDN. This is most likely a duplicate plugin version issue.`
    );
  }

  // TODO do 4 and 5 in parallel and rollback if one fails

  // -- 4 -- Insert the plugin into the database
  console.log("Inserting plugin");
  console.table(parseRes.data);

  const createRes = await db.insert(plugin).values({
    id: pluginId,
    publisherId: session.user.userId,
    title,
    description,
    latestVersion,
  });
  console.log("Inserted plugin, affected", createRes.rowsAffected);

  if (createRes.rowsAffected !== 1) {
    return response.error("Failed to create plugin. Please try again later.");
  }

  // -- 5 -- Upload the plugin to the CDN
  console.log(`Uploading plugin with key ${key}`);
  const uploadRes = await uploadPlugin(file, key);

  console.log("Uploaded");
  console.table(uploadRes);

  if (uploadRes.failed) {
    return response.error(`Failed to upload plugin to CDN: ${uploadRes.error}`);
  }

  return response.success({
    pluginId,
    title,
    version: latestVersion,
  });
};

