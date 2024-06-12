const webpack = require('webpack');
const getCommitHash = require('./src/getCommitHash');

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DefinePlugin({
      'process.env.REACT_APP_COMMIT_HASH': JSON.stringify(getCommitHash()),
    }),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['my-custom-babel-preset'],
      ignore: ['./node_modules/mapbox-gl/dist/mapbox-gl.js'],
    },
  },
};
