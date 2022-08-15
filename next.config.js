/** @type {import('next').NextConfig} */

const stack = require("./stack.json");

const nextConfig = {
  env: {
    ...(stack || {}),
  },
  reactStrictMode: true,
};

module.exports =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")()(nextConfig)
    : nextConfig;
