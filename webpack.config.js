const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "/public/build"),
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  devServer: { static: "./public/build/" },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.(s(a|c)ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js", ".otf"] },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./src/images", to: "./images" },
        // { from: "./src/fonts", to: "./fonts" },
      ],
    }),
  ],
};
