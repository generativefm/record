'use strict';

const baseConfig = require('./webpack.base.config');

const devConfig = Object.assign(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: { historyApiFallback: true },
});

devConfig.module.rules.unshift({
  test: /\.s?css$/,
  include: /src/,
  use: ['style-loader', 'css-loader'],
});

module.exports = devConfig;
