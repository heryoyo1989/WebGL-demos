const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    proxy: {
      '/':'http://localhost:3000'
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
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
        {
          test:/\.(vs|fs)$/i,
          use: 'raw-loader'
        }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  }
};