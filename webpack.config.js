const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
      main: "./src/index.tsx",
  },
  plugins: [
      new HTMLWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html',
          inject: 'body'
      })
  ],
  output: {
      filename: "[name].bundle.js",
      chunkFilename: '[name].chunk.js',
      path: __dirname + "/dist/"
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"]
  },
  module: {
      rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
          {
              test: /\.tsx?$/,
              loader: "ts-loader",
          },

          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
          {
              test: /\.css$/,
              use: [{loader: "style-loader"}, {loader: "css-loader"}]
          },
      ]
  },
  optimization: {
      splitChunks: {
          chunks: "all"
      },
      usedExports: true
  },
};