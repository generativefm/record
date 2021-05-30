'use strict';
const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[contenthash].js',
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    mainFields: ['generativeFmManifest', 'browser', 'module', 'main'],
    alias: {
      react: path.join(__dirname, 'node_modules/react'),
      'react-router-dom': path.join(__dirname, 'node_modules/react-router-dom'),
      'react-dom': path.join(__dirname, 'node_modules/react-dom'),
      tone: path.join(__dirname, 'node_modules/tone'),
    },
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
        test: /\.scss$/,
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
        test: [/\.png$/, /\.mp3$/],
        use: 'file-loader',
      },
      {
        test: /\.png$/,
        use: 'image-webpack-loader',
      },
      {
        test: /\.js$/,
        include: /node_modules\/tone/,
        use: 'source-map-loader',
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      favicons: {
        appName: 'Generative.fm Record',
        appDescription: 'Free ambient music, made to order by Generative.fm',
        theme: '#1e1e1e',
        background: '#121212',
      },
    }),
    new FaviconsWebpackPlugin({ logo: './src/logo.png', prefix: '' }),
    new EnvironmentPlugin({
      SAMPLE_FILE_HOST: '//localhost:6969',
    }),
  ],
};

module.exports = config;
