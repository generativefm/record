'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.config');

const prodConfig = Object.assign(baseConfig, {
  mode: 'production',
});

prodConfig.module.rules.unshift({
  test: /\.s?css$/,
  include: /src/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
});

prodConfig.plugins.push(
  new MiniCssExtractPlugin({ filename: '[name].[hash].css' })
);
