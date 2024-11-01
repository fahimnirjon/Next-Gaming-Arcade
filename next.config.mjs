/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d128e54tmgemxy.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
