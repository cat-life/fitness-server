import config from 'config';
import webpack from 'webpack';

const globals = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'react-redux',
  'redux-thunk',
  'antd',
  'superagent',
  'rs-breadcrumb',
  'rs-page'
];

export default {
  output: {
    path: config.path.js.dest,
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    lib: globals
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'gulp/manifest.json',
      name: '[name]',
      context: config.path.js.dest
    })
  ]
};
