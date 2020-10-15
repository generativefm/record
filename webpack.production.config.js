'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EnvironmentPlugin } = require('webpack');
const baseConfig = require('./webpack.base.config');

const prodConfig = Object.assign(baseConfig, {
  mode: 'production',
});

prodConfig.module.rules.unshift({
  test: /\.s?css$/,
  include: /src/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
});

prodConfig.resolve = Object.assign(prodConfig.resolve, {
  alias: {
    'fuse.js$': path.resolve('./node_modules/fuse.js/dist/fuse.basic.min.js'),
  },
});

prodConfig.plugins.push(
  new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
  new EnvironmentPlugin(['RELEASE_TAG'])
);

module.exports = prodConfig;
