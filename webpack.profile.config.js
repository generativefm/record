'use strict';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const prodConfig = require('./webpack.production.config');

const profileConfig = Object.assign({}, prodConfig);

profileConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = profileConfig;
