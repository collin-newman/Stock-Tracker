const path = require('path');

module.exports = {
  entry: './server/index.tsx',
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include: /server/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  }
};