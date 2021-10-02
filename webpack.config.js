const path = require("path");
const webpack = require("webpack");

const dev = process.env.development === true

module.exports = {
  mode: "development",
  devtool: dev ? "eval-source-map" : "inline-cheap-module-source-map",
  entry: [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client",
    path.resolve("src/index.js"),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader:
          "babel-loader?babelrc=false&extends=" +
          path.resolve(__dirname, ".babelrc"),
        exclude: [/node_modules/, /pdfmake.js$/],
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
      // {
      //   loader: "babel-loader",
      //   test: /\.js$|jsx/,
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
  ],
  resolveLoader: {
    modules: ["src", "sass", "public", "bower_components", "node_modules"],
  },
};
