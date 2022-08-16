/** @type {import('next').NextConfig} */

const stack = require("./stack.json");

const nextConfig = {
  env: {
    ...(stack || {}),
    CLOUDFLARE_IMAGE_CDN_URL: process.env.CLOUDFLARE_IMAGE_CDN_URL,
  },
  reactStrictMode: true,
  images: { domains: ["jonbilous.com"] },
};

module.exports =
  process.env.ANALYZE === "true"
    ? require("@next/bundle-analyzer")()(nextConfig)
    : nextConfig;
