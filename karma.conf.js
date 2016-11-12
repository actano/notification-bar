/* eslint-disable import/no-extraneous-dependencies */

const karmaWebpack = require('karma-webpack')
const webpackConfig = require('./webpack.config')

webpackConfig.devtool = 'inline-source-map'

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      // 'dist/*.js',
      'lib/index.js',
      'lib/test/**/*.js',
    ],

    preprocessors: {
      'lib/**/*.js': ['webpack', 'sourcemap'],
    },

    singleRun: true,
    plugins: [
      karmaWebpack, 'karma-*',
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        chunks: false,
      },
    },
  })
}
