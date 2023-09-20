import type { InferInsertModel } from "drizzle-orm";

import { plugin } from "$server/db/schema";
import type { FailableResponse } from "$lib/types";

import { fileExits, uploadFile } from "./generic";

export type S3UploadPluginData = Pick<
  InferInsertModel<typeof plugin>,
  "id" | "latestVersion"
>;

export const constructPluginKey = (data: S3UploadPluginData) =>
  `${data.id}/${data.latestVersion}.jar`;

export const decompileJar = async (file: Blob): Promise<FailableResponse> => {
  // console.log(file.type);

  // if (file.type !== "application/java-archive") {
  //   return {
  //     failed: true,
  //     error: "File is not a jar",
  //   };
  // }

  return {
    failed: false,
  };
};

export const uploadPlugin = async (
  file: Blob,
  key: string
): Promise<
  | {
      failed: false;
    }
  | {
      failed: true;
      error: string;
    }
> => {
  const jarInfo = await decompileJar(file);
  if (jarInfo.failed) {
    return {
      failed: true,
      error: jarInfo.error,
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

