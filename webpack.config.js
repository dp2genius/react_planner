var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var isProduction = process.argv.indexOf('--production') !== -1;

module.exports = {
  entry: path.resolve(__dirname, 'src/main.js'),
  devtool: isProduction ? 'eval' : 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "dist")
  },
  output: {
    path: __dirname + "/dist",
    filename: "build.js"
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: isProduction ?
    [new webpack.optimize.UglifyJsPlugin()] :
    [new OpenBrowserPlugin({url: 'http://localhost:8080'})]
};
