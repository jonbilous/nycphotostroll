import { ImageLoader } from "next/image";

export const imageLoader: ImageLoader = ({ src, ...params }) => {
  const cdnConfig = { format: "webp", ...params };

  const configAsString = Object.entries(cdnConfig)
    .flatMap(([key, value]) => {
      return value ? [key, value].join("=") : [];
    })
    .join(",");

  return `${process.env.CLOUDFLARE_IMAGE_CDN_URL}/${configAsString}/${src}`;
};
