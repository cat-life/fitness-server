import config from 'config';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import precss from 'precss';
import autoprefixer from 'autoprefixer';
import manifest from './manifest.json';
// var imageUrl = require(path.join(config.root, './gulp/util/image_url'));

let { entry } = config.path.js;
let entries = {};
fs.readdirSync(entry).forEach((item) => {
  entries[item] = path.join(entry, item, 'Index.js');
});

const rootPath = path.dirname(__dirname);
const rooter = dir => path.join(rootPath, dir);

export default {
  entry: entries,
  output: {
    path: config.path.js.dest,
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.(es6|js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-0'],
        plugins: [
          'antd',
          'add-module-exports',
          'transform-decorators-legacy',
          ['transform-runtime', {
            'polyfill': false,
            'regenerator': true
          }]
        ]
      }
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style', 'css!less')
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss')
    }]
  },
  resolve: {
    alias: {
      app: rooter('app'),
      main: rooter('app/pages/index')
    },
    extensions: ['', '.jsx', '.js', '.scss', '.html'],
    modulesDirectories: ['node_modules']
  },
  postcss: () => {
    return [
      precss,
      autoprefixer
    ];
  },
  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin('../css/[name].css', { allChunks: true }),
    new webpack.DllReferencePlugin({
      context: config.path.js.dest,
      manifest
    })
  ]
};
