/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'partner.citywitty.com',
          },
        ],
        destination: '/partner/:path*',
      },
    ];
  }
};

module.exports = nextConfig;
