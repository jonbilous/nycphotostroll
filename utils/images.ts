import { imageResolver } from "@jonbilous/image-data/utils/images";

export const resolveImages = imageResolver({
  bucket: process.env.S3_BUCKET!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});
