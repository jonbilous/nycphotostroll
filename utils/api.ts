import { createApi } from "@jonbilous/next-js-rpc/server";
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
    get: async () => {
      return null as any;
    },
    write: async () => {},
    flush: async () => {},
    defaultTtl: 10000,
  },
});

export default api;
