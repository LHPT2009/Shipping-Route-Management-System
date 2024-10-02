/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
};

export default nextConfig;
