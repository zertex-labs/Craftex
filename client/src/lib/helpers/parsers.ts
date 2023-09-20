import YAML from "js-yaml";
import JSZip from "jszip";
import type { z } from "zod";

import type { FailableResponse } from "$lib/types";
import { requiredYAMLPluginDataSchema } from "$lib/validation";

export type YAMLRequiredPluginData = z.infer<
  typeof requiredYAMLPluginDataSchema
>;

export const parseBlobToJSZip = async (file: Blob, zipInstance: JSZip) => {
  return zipInstance.loadAsync(await file.arrayBuffer());
};

export const parsePluginYAML = async (
  file: JSZip.JSZipObject,
  zipInstance: JSZip
) => {
  return file.async("string").then((pluginYml) => {
    const jsonContent = YAML.load(pluginYml);
    return requiredYAMLPluginDataSchema.parse(jsonContent);
  });
};

export const getRequiredDataFromPluginYAML = async (
  file: Blob
): Promise<FailableResponse<YAMLRequiredPluginData>> => {
  const jszip = new JSZip();

  let zip: JSZip;
  try {
    zip = await parseBlobToJSZip(file, jszip);
  } catch (e) {
    console.error(e);
    return {
      failed: true,
      error: "Failed to parse jszip from blob. Is it a valid .jar file?",
    };
  }

  // TODO? should be safe, if not found it returns null
  const pluginYml = zip.file("plugin.yml");
  if (!pluginYml) {
    return {
      failed: true,
      error: "Provided .jar file does not contain a plugin.yml",
    };
  }

  let contents: YAMLRequiredPluginData;
  try {
    contents = await parsePluginYAML(pluginYml, jszip);
  } catch(e) {
    console.error(e);
    return {
      failed: true,
      error: "Failed to parse plugin.yml",
    };
  }

  return {
    failed: false,
    data: contents,
  };
};

