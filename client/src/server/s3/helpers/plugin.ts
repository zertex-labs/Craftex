import type { Plugin } from "$lib/types";

import { uploadFile } from "./generic";
import { getRequiredDataFromPluginYAML } from "$lib/helpers/parsers";

export type S3UploadPluginData = {
  id: string;
  version: string | string[];
};

export const constructPluginKey = ({ id, version }: S3UploadPluginData) => {
  const latest = Array.isArray(version) ? version.at(-1) : version;
  // should never happen
  if (!latest) {
    throw new Error("No latest version found");
  }

  return `${id}/${latest}`;
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
  const jarInfo = await getRequiredDataFromPluginYAML(file);
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

