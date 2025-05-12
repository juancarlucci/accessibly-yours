/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  webpack: (
    config: {
      optimization: {
        splitChunks: {
          chunks: string;
          minSize: number;
          maxSize: number;
          cacheGroups: {
            vendor: {
              test: RegExp;
              name(module: {
                context: { match: (arg0: RegExp) => unknown[] };
              }): string;
            };
          };
        };
      };
    },
  ) => {
    // Enable granular chunks
    config.optimization.splitChunks = {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: { context: { match: (arg0: RegExp) => unknown[] } }) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `vendor.${(packageName as string).replace("@", "")}`;
          },
        },
      },
    };
    return config;
  },
};

module.exports = nextConfig;
