const path = require("path");

const test_folder = "test";

const config = {
  mode: "development",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src", "index-test"),
  output: {
    library: {
      name: "v3d-core",
      type: "umd",
    },
    filename: "[name].test.js",
    path: path.resolve(__dirname, test_folder),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".js", ".ts"],
    symlinks: false,
  },
  experiments: {
    topLevelAwait: true,
  },
  target: ["web"],
  devServer: {
    allowedHosts: "localhost",
    static: {
      directory: path.resolve(__dirname, test_folder),
    },
    compress: true,
    port: 8080,
  },
//   optimization_original: {
//     splitChunks: {
//       cacheGroups: {
//         babylonjs: {
//           test: /[\\/]node_modules[\\/]@babylonjs[\\/]/,
//           name: "babylonjs",
//           chunks: "all",
//         },
//       },
//     },
//   },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name(_module, chunks, _cacheGroupKey) {
            return `vendors~${chunks[0].name}`;
          },
        },
      },
    },
  },
};

module.exports = config;
