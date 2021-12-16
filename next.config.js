module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpackDevMiddleware: (config) => {
    return config;
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/api/cart/order_cash",
  //       destination: "/orderConfirmed",
  //       permanent: false,
  //     },
  //     {
  //       source: "/api/cart/order_cardPickup",
  //       destination: "/orderConfirmed",
  //       permanent: false,
  //     },
  //   ];
  // },
};
