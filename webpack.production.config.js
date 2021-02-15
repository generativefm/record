'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EnvironmentPlugin } = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const baseConfig = require('./webpack.base.config');

const prodConfig = Object.assign(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
});

prodConfig.module.rules.unshift({
  test: /\.s?css$/,
  include: /src/,
  use: [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { importLoaders: 1 } },
  ],
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

if (process.env.SENTRY_AUTH_TOKEN && process.env.RELEASE_TAG) {
  prodConfig.plugins.push(
    new SentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      release: process.env.RELEASE_TAG,
      org: 'ab-0v',
      project: 'record-web',
      include: ['./src', './dist'],
      deploy: {
        env: 'production',
        name: `${process.env.RELEASE_TAG} automatic deployment`,
        url: `https://github.com/generative-fm/record/actions/runs/${process.env.GITHUB_RUN_NUMBER}`,
      },
    })
  );
}

module.exports = prodConfig;
