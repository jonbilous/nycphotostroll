import { createUpstashRedisCache } from "@jonbilous/utils/cache";

const upstashCache = createUpstashRedisCache(
  {
    url: process.env.UPSTASH_URL!,
    token: process.env.UPSTASH_TOKEN!,
  },
  10000
);

export default upstashCache;
