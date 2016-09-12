const webpack = require('webpack');

var isProduction = (process.env.NODE_ENV === 'production');

var webpackConfig = {
  entry: {
    library: './src/index.js',
    "library.min": './src/index.js'
  },
  output: {
    path: './lib',
    filename: '[name].js',
    library: 'boggLib',
    libraryTarget: 'umd'
  },
  externals: {
    'typo-js': 'typo-js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: []
};

if ( isProduction ) {

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      include: /\.min\.js$/,
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      }
    })
  );

};

module.exports = webpackConfig;