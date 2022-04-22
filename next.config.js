/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "catat",
        mongodb_password: "vbq0U3LBYHi3iAr5",
        mongodb_clustername: "cluster0",
        mongodb_database: "books-dev",
      },
      reactStrictMode: true,
      images: {
        domains: ["namespaceit.com","randomuser.me", "s3.amazonaws.com"],
      },
    };
  }
  return {
    env: {
      mongodb_username: "catat",
      mongodb_password: "vbq0U3LBYHi3iAr5",
      mongodb_clustername: "cluster0",
      mongodb_database: "books",
    },
    reactStrictMode: true,
    images: {
      domains: ["namespaceit.com"],
    },
  };
};

module.exports = nextConfig;
