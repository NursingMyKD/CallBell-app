
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: [
      'https://6000-idx-studio-1746049973989.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
    ],
  },
  images: {
    remotePatterns: [
      // { protocol: 'https', hostname: 'picsum.photos', }, // Removed as per review
      // Add other remote patterns here if needed
    ].filter(pattern => pattern.hostname !== 'picsum.photos'), // Ensure picsum.photos is removed if it was there
  },
};

// If remotePatterns ends up empty, and it's the only key in images, 
// we can remove the images key altogether for a cleaner config.
if (nextConfig.images && nextConfig.images.remotePatterns && nextConfig.images.remotePatterns.length === 0) {
  delete nextConfig.images.remotePatterns;
}
if (nextConfig.images && Object.keys(nextConfig.images).length === 0) {
  delete nextConfig.images;
}

export default nextConfig;
