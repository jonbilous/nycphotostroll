import AWS from "aws-sdk";
import api from "utils/api";
import { requireAuth } from "utils/ctx";
import db from "utils/db";
import { v4 } from "uuid";
import zod from "zod";

const s3 = new AWS.S3();

const url = "/api/images/get_presigned_put/";

const getPresignedPut = api.createHandler({
  ctx: { user: requireAuth() },
  url,
  fn: async ({ event }, { user }) => {
    const uid = v4();

    await db.image.create({
      data: {
        uid,
        status: "uploading",
        user: { connect: { id: user.id } },
        event: { connect: { uid: event } },
      },
    });

    const signedUrl = s3.getSignedUrl("putObject", {
      Bucket: process.env.S3_BUCKET,
      Key: uid + ".jpg",
      Expires: 86400,
      ACL: "public-read",
      ContentType: "image/jpeg",
    });

    return { url: signedUrl, uid };
  },
  schema: zod.object({ event: zod.string() }),
});

export type GetPresignedPut = typeof getPresignedPut;

export default getPresignedPut;
