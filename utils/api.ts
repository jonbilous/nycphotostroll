import { createApi } from "@jonbilous/next-js-rpc/server";
import upstashCache from "./cache";
import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
  region: "us-east-1",
});

const api = createApi({
  cacheProvider: {
    ...upstashCache,
    get: true
      ? async () => {
          return null as any;
        }
      : upstashCache.get,
    defaultTtl: 10000,
  },
});

export default api;
