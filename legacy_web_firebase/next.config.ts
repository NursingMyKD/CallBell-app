
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Added for serverful deployment
  images: {
    remotePatterns: [
      // Ensure this array is empty if no patterns are active,
      // instead of deleting the key.
    ],
  },
};

export default nextConfig;
