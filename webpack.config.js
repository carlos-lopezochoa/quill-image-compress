const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * @type {import('webpack').Configuration}
 */
module.exports = [
  {
    entry: {
      "index": "./src/index.ts",
      "quill.imageCompressor": "./src/quill.imageCompressor.ts"
    },
    output: {
      filename: (pathData) => {
        return pathData.chunk.name === 'index' ? '[name].js' : '[name].min.js';
      },
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
      publicPath: "/dist/"
    },
    externals: {
      quill: "Quill"
    },
    resolve: {
      extensions: [".ts", ".js"],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
        }),
      ],
    },
    module: {
      rules: [
        { test: /\.ts$/, use: ["ts-loader"], exclude: /node_modules/ },
      ]
    }
  }
];
