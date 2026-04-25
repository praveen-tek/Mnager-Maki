const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/Manger-Maki',
    assetPrefix: '/Manger-Maki/',
  }),
};

module.exports = nextConfig;
