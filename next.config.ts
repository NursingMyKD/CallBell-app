
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      'https://6000-idx-studio-1746049973989.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
    ],
  },
  images: {
    remotePatterns: [
      // Add other remote patterns here if needed.
      // Ensure this array is empty if no patterns are active,
      // instead of deleting the key.
    ],
  },
};

export default nextConfig;
