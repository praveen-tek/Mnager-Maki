const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  ...(process.env.GITHUB_ACTIONS === 'true' && {
    basePath: '/Manger-Maki',
    assetPrefix: '/Manger-Maki/',
  }),
};

module.exports = nextConfig;