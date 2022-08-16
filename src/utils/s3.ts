import { Endpoint } from "aws-sdk";
import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  endpoint: new Endpoint("fra1.digitaloceanspaces.com"),
  region: "fra1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
  },
});
