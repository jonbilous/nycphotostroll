import api from "utils/api";
import db from "utils/db";

const url = "/api/images/get/";

const getImages = api.createHandler({
  url,
  fn: async () => {
    const images = await db.image.findMany({ where: { status: "published" } });

    return images.map((img) => ({
      ...img,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${img.uid}.jpg`,
    }));
  },
});

export type GetImages = typeof getImages;

export default getImages;
