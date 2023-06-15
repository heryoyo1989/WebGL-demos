const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
    print: './src/print.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
  module: {
    rules: [
        {
          test:/\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { 
          test: /\.(png|jp(e*)g|svg|gif)$/i, 
          type: 'asset/resource',
          // use: 'file-loader', 
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  /*optimization: {
    runtimeChunk: 'single'
  }*/
};