import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: [
      'https://6000-idx-studio-1746049973989.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
      'local-origin.dev',
      '*.local-origin.dev',
      'https://9004-idx-studio-1746049973989.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
      'https://9005-idx-studio-1746049973989.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
