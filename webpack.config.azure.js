import fs from 'fs';
import path from 'path';
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

export default {
  debug: true,
  noInfo: false,
  entry: './buildScripts/distServer.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options:{
        presets: ['es2015']}
      }
    ]
  }
}
