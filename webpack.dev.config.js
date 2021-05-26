'use strict';

const baseConfig = require('./webpack.base.config');

const devConfig = Object.assign(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: { historyApiFallback: true },
});

devConfig.module.rules.unshift({
  test: /\.s?css$/,
  use: [
    'style-loader',
    { loader: 'css-loader', options: { importLoaders: 1 } },
  ],
});

module.exports = devConfig;
