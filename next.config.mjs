import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  // experimental: {
  //   viewTransition: true,
  // },

  eslint: {
    // We have lint being run during CI so we do not need lint to be run again during builds
    ignoreDuringBuilds: true,
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
