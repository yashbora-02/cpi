/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  eslint: {
    ignoreDuringBuilds: true, // 👈 this disables ESLint errors during build
  },
};

module.exports = nextConfig;
