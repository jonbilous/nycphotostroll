import { ImageLoader } from "next/image";

export const resolveImageUrl = (image: { uid: string }) => {
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${image.uid}.jpg`;
};

export const imageLoader: ImageLoader = ({ src, ...params }) => {
  const cdnConfig = { format: "webp", ...params };

  const configAsString = Object.entries(cdnConfig)
    .flatMap(([key, value]) => {
      return value ? [key, value].join("=") : [];
    })
    .join(",");

  return `${process.env.CLOUDFLARE_IMAGE_CDN_URL}/${configAsString}/${src}`;
};
