/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer')

const config = {
  context: `${__dirname}/lib`,
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index.js',
    library: 'notificationBar',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jade$/,
        loader: 'jade-loader?requireSyntax=true',
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!postcss-loader!stylus-loader?{"sourceMap": true, "requireSyntax": true, "resolve url": true}',
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions', 'Firefox 15'] }),
  ],
  externals: {
    mocha: 'Mocha',
    'notification-bar': 'notificationBar',
  },
  devtool: 'source-map',
}

module.exports = config
