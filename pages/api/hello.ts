import AWS from "aws-sdk";
import api from "utils/api";
import { z } from "zod";

const s3 = new AWS.S3();

const url = "/api/images/getImages/";

const getImages = api.createHandler({
  url,
  fn: async () => {},
  schema: z.object({}),
});

export type ImageQuery = typeof getImages;

export default getImages;
