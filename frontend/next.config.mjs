/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // cacheComponents: true,
  // partialPrefetching: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/static/images/**",
      },
    ],
    dangerouslyAllowLocalIP: true,
    // dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
