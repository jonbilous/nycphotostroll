import { HTTPError } from "@jonbilous/next-js-rpc/server";
import api from "utils/api";
import db from "utils/db";
import { resolveImageUrl } from "utils/images";
import { z } from "zod";

const url = "/api/images/get/";

const getEvent = api.createHandler({
  schema: z.object({ uid: z.string() }),
  url,
  fn: async ({ uid }) => {
    const event = await db.event.findFirst({
      where: { uid },
      include: {
        images: {
          where: { status: "published" },
          include: { user: { select: { name: true } } },
        },
      },
    });

    if (!event) {
      throw new HTTPError("Event not found", 404);
    }

    return {
      ...event,
      images: event.images.map((img) => ({
        ...img,
        url: resolveImageUrl(img),
      })),
    };
  },
});

export type GetEvent = typeof getEvent;

export default getEvent;
