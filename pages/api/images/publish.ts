import AWS from "aws-sdk";
import api from "utils/api";
import db from "utils/db";
import zod from "zod";

const s3 = new AWS.S3();

export const publishImageSchema = zod.object({
  uid: zod.string(),
});

const url = "/api/images/publish/";

const publishImage = api.createHandler({
  url,
  fn: async ({ uid }) => {
    await db.image.updateMany({
      where: { uid },
      data: { status: "published" },
    });
  },
  schema: publishImageSchema,
});

export type PublishImage = typeof publishImage;

export default publishImage;
