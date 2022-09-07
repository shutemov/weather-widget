const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        ({
          ...options,
          compilerOptions: {
            // treat any tag that starts with ion- as custom elements
            isCustomElement: (tag) => tag.includes("-"),
          },
        });
      });

    config.optimization.delete("splitChunks");
  },
});
