import { Bucket, s3Client } from "../client";

export const fileExits = async (Key: string) =>
  s3Client
    .headObject({
      Bucket,
      Key,
    })
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

export const uploadFile = async (Key: string, file: File) =>
  s3Client
    .putObject({
      Bucket,
      Key,
      Body: Buffer.from(await file.arrayBuffer()),
    })
    .then(() => true)
    .catch((err) => {
      console.error(err);
      return false;
    });

