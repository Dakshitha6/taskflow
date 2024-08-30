/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        VOOSH_SERVER_ENDPOINT: process.env.VOOSH_SERVER_ENDPOINT,
      },
};

export default nextConfig;
