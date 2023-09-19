import type { InferInsertModel } from "drizzle-orm";

import { plugin } from "$lib/db/schema";
import type { FailableResponse } from "$lib/types";

import { fileExits, uploadFile } from "./generic";

export type S3UploadPluginData = Pick<
  InferInsertModel<typeof plugin>,
  "id" | "latestVersion"
>;

export const constructPluginKey = (data: S3UploadPluginData) =>
  `${data.id}/${data.latestVersion}.jar`;

export const decompileJar = async (file: File): Promise<FailableResponse> => {
  console.log(file.type);

  if (file.type !== "application/java-archive") {
    return {
      failed: true,
      error: "File is not a jar",
    };
  }

  return {
    failed: false,
  };
};

export const uploadPlugin = async (
  file: File,
  pluginData: S3UploadPluginData
): Promise<
  | {
      failed: false;
    }
  | {
      failed: true;
      error: string;
    }
> => {
  const key = constructPluginKey(pluginData);

  const jarInfo = await decompileJar(file);
  if (jarInfo.failed) {
    return {
      failed: true,
      error: jarInfo.error,
    };
  }

  console.log("Checking if plugin already exists", key);

  const alreadyUploaded = await fileExits(key);
  if (alreadyUploaded) {
    return {
      failed: true,
      error: "Plugin already uploaded",
    };
  }

  console.log("Uploading plugin", key);

  const uploadIsSuccessfull = await uploadFile(key, file);
  if (!uploadIsSuccessfull) {
    return {
      failed: true,
      error: "Upload failed",
    };
  }

  return {
    failed: false,
  };
};

