'use strict';

const baseConfig = require('./webpack.base.config');

module.exports = Object.assign(baseConfig, {
  mode: 'production',
});
