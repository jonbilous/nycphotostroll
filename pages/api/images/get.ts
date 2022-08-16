import { HTTPError } from "@jonbilous/next-js-rpc/server";
import AWS from "aws-sdk";
import api from "utils/api";
import db from "utils/db";
import { resolveImageUrl } from "utils/images";
import zod from "zod";

const url = "/api/images/get/";

const getImage = api.createHandler({
  url,
  fn: async ({ uid }) => {
    const image = await db.image.findFirst({
      where: { uid },
      include: { event: true },
    });

    if (!image) {
      throw new HTTPError("Image not found", 404);
    }

    return { ...image, url: resolveImageUrl(image) };
  },
  schema: zod.object({ uid: zod.string() }),
});

export type GetImage = typeof getImage;

export default getImage;
