'use strict';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: /src/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        include: /src/,
        use: { loader: 'eslint-loader', options: { emitWarning: true } },
      },
      {
        test: /\.s?css$/,
        include: /src/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        include: /src/,
        use: 'sass-loader',
      },
      {
        test: /\.gfm.manifest.json$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-syntax-dynamic-import'],
            },
          },
          path.resolve('./piece-loader.js'),
        ],
        include: /@generative-music\/piece-/,
        type: 'javascript/auto',
      },
      {
        test: /\.worker\.js$/,
        use: 'worker-loader',
      },
      {
        test: /\.png$/,
        use: 'file-loader',
      },
      {
        test: /\.js$/,
        include: /node_modules\/tone/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: 'src/index.template.html' })],
};

module.exports = config;
