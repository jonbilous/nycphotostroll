import api from "utils/api";
import db from "utils/db";
import { resolveImageUrl } from "utils/images";

const url = "/api/images/list/";

const listImages = api.createHandler({
  url,
  fn: async () => {
    const images = await db.image.findMany({
      include: { event: true, user: { select: { name: true } } },
    });

    return images.map((img) => ({ ...img, url: resolveImageUrl(img) }));
  },
});

export type ListImages = typeof listImages;

export default listImages;
