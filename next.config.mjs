/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ecommerce.routemisr.com',
            port: '',
            pathname: '/Route-Academy-**/**',
          },
        ],
      },
};

export default nextConfig;
