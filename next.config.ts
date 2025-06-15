
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Added for serverful deployment
  experimental: {
    allowedDevOrigins: [
      'https://6000-idx-studio-1746049973989.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
    ],
  },
  images: {
    remotePatterns: [
      // Ensure this array is empty if no patterns are active,
      // instead of deleting the key.
    ],
  },
};

export default nextConfig;
